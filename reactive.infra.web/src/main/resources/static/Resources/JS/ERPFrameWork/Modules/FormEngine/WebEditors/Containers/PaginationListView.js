import {ListView} from "../../../../../UIFrameWork/HTML/ListView/ListView.js";
import PagingDTO from "../../../../Communicate/Models/Request/Common/PagingDTO.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class PaginationListView extends ListView {
    constructor(pageSize) {
        super();
        this.setScrollTypeY(HTMLComponent.ScrollType.Auto);

        this.pageSize = !pageSize ? 20 : this.pageSize;

        this.pagingDTO = new PagingDTO();
        this.pagingDTO.setFromRecord(0);
        this.pagingDTO.setToRecord(this.pageSize);

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting === true) {
                let lastIndex = this.getElement().childNodes.length + 1;
                if (lastIndex > this.pagingDTO.getToRecord()) {
                    this.pagingDTO.setFromRecord(lastIndex);
                    this.pagingDTO.setToRecord(this.pageSize + this.pagingDTO.getFromRecord());
                    this.fireEvent(FormEngineEventFrameWork.event.Components.Paging.ChangePage, new BaseEvent(this));
                }
            }
        }, {threshold: [0]});
    }

    startCaptureLatestElement() {
        let lastElement = this.getElement().childNodes[this.getElement().childNodes.length - 1];
        if (this.lastElement && lastElement !== this.lastElement) {
            this.observer.unobserve(this.lastElement);
            this.observer.observe(lastElement);
            this.lastElement = lastElement;
        } else if (!this.lastElement && lastElement) {
            this.observer.observe(lastElement);
            this.lastElement = lastElement;
        }
    }

    onDetach() {
        super.onDetach();
        this.observer.disconnect();
        this.lastElement = null;
        this.pagingDTO.setFromRecord(0);
        this.pagingDTO.setToRecord(this.pageSize);
    }

    setActivePagination(pagination) {
        this.pagination = pagination;
    }

    getPagingModel() {
        return this.pagingDTO;
    }
}
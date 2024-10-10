import {HTMLComponent} from "../Component/HTMLComponent.js";
import {DOM} from "../../Shared/Common/DOM.js";
import AccordionFrame from "./AccordionFrame.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import AccordionFrameItemEvent from "./AccordionFrameItemEvent.js";

export default class AccordionFrameItem extends HTMLComponent {
    constructor(title, record) {
        super();

        this.pTitle = DOM.createElement("p");
        this.pTitle.innerHTML = title;

        let master = DOM.createElement("div");
        master.appendChild(this.pTitle);

        this.setElement(master);
        this.setData("ModelItem", record);
        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.onMouseClick.name, this);
    }

    onMouseClick(event) {
        this.fireEvent(EventFrameWork.event.Components.AccordionFrameItem.Select, new AccordionFrameItemEvent(this, this.getData().get("ModelItem")));
    }

    setItemClass(itemClass) {
        this.itemClass = itemClass;
        DOM.setClassNames(this.pTitle, itemClass);
    }

    setItemSelectedClass(itemSelectedClass) {
        this.itemSelectedClass = itemSelectedClass;
    }

    select(select) {
        if (select) {
            DOM.addClassName(this.pTitle, this.itemSelectedClass);
        } else {
            DOM.removeClassName(this.pTitle, this.itemSelectedClass);
        }
    }

    onAttach(parentElement, appenderFunction) {
        if (this.getParent() instanceof AccordionFrame) {
            super.onAttach(this.getParent().bodyElement, appenderFunction);
        } else {
            super.onAttach(parentElement, appenderFunction);
        }
    }
}
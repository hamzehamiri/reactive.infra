import {BaseObservable} from "../../../../Shared/Event/BaseObservable.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";

export class WebGridEditor extends BaseObservable {
    constructor() {
        super();
    }

    bindEventToGrid(webGridAdvanced) {
        this.webGridAdvanced = webGridAdvanced;
        this.webGridAdvanced.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.dblclick, webGridAdvanced.getElement(), this.onMouseDblClick.name, this);
    }

    onMouseDblClick(event) {

    }
}
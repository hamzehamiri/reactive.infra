import BaseEvent from "../../Shared/Event/BaseEvent.js";

export default class AccordionEvent extends BaseEvent {
    constructor(source, accordionFrameItem, model) {
        super(source);
        this.setAccordionFrameItem(accordionFrameItem);
        this.setModel(model);
    }

    setAccordionFrameItem(accordionFrameItem) {
        this.accordionFrameItem = accordionFrameItem;
    }

    setModel(model) {
        this.model = model;
    }
}
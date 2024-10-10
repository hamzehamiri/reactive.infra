import BaseEvent from "../../Shared/Event/BaseEvent.js";

export default class AccordionFrameItemEvent extends BaseEvent {
    constructor(source, model) {
        super(source);
        this.setModel(model);
    }

    setModel(model) {
        this.model = model;
    }
}
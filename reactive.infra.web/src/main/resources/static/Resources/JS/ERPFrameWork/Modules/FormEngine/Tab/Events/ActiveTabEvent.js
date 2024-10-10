import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class ActiveTabEvent extends BaseEvent {
    constructor(source) {
        super(source);
    }

    setActiveTabController(activeTabController) {
        this.activeTabController = activeTabController;
    }

    getActiveTabController() {
        return this.activeTabController;
    }
}
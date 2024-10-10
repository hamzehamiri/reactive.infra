import BaseEvent from "../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class ToolbarBindPleaseEvent extends BaseEvent {
    constructor(source, coreButtonAssignElementDTOMap) {
        super(source);
        this.coreButtonAssignElementDTOMap = coreButtonAssignElementDTOMap;
    }

    getCoreButtonAssignElementDTOMap() {
        return this.coreButtonAssignElementDTOMap;
    }
}
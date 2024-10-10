import BaseEvent from "../../../../Shared/Event/BaseEvent.js";

export default class GridSelectionEvent extends BaseEvent {

    constructor(source, stackMapSelected, targetModel, latestRecord, isAdded) {
        super(source);
        this.stackMapSelected = stackMapSelected;
        this.targetModel = targetModel;
        this.latestRecord = latestRecord;
        this.isAdded = isAdded;
    }

    getStackMapSelected() {
        return this.stackMapSelected;
    }

    getTargetModel() {
        return this.targetModel;
    }

    getLatestRecord() {
        return this.latestRecord;
    }

    getIsAdded() {
        return this.isAdded;
    }
}
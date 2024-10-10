import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreProcessResponseDTO extends BaseModel {

    constructor() {
        super();
    }

    setTotalEstimate(totalEstimate) {
        this.totalEstimate = totalEstimate;
    }

    getTotalEstimate() {
        return this.totalEstimate;
    }

    setTaskComplete(taskComplete) {
        this.taskComplete = taskComplete;
    }

    getTaskComplete() {
        return this.taskComplete;
    }

    getBodyResponse() {
        return this.bodyResponse;
    }

    getDateTime() {
        return this.dateTime;
    }
}
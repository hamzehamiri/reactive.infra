import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWindowSaveDataRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setWindowId(windowId) {
        this.windowId = windowId;
    }

    setTabDataMap(tabDataMap) {
        this.tabDataMap = tabDataMap;
    }

    setTabDataMapOriginal(tabDataMapOriginal) {
        this.tabDataMapOriginal = tabDataMapOriginal;
    }
}
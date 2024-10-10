import {BaseModel} from "../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../Common/ConvertUtil.js";
import CoreWindowTabColumnProfileDTO from "./Table/CoreWindowTabColumnProfileDTO.js";

export default class CoreWindowTabProfileDTO extends BaseModel {
    constructor() {
        super();
    }

    setTabId(tabId) {
        this.tabId = tabId;
    }

    getTabId() {
        return this.tabId;
    }

    setTabIndex(tabIndex) {
        this.tabIndex = tabIndex;
    }

    getTabIndex() {
        return this.tabIndex;
    }

    getCoreWindowTabColumnProfileMap() {
        if (this.coreWindowTabColumnProfileMap) {
            if (!(this.coreWindowTabColumnProfileMap instanceof Map)){
                this.coreWindowTabColumnProfileMap = ConvertUtil.ConvertGeneralWithMap(CoreWindowTabColumnProfileDTO, this.coreWindowTabColumnProfileMap);
            }
        } else {
            this.coreWindowTabColumnProfileMap = new Map();
        }
        return this.coreWindowTabColumnProfileMap;
    }
}
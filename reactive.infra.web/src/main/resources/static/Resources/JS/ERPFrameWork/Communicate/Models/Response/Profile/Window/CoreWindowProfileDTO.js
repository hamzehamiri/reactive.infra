import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreWindowTabProfileDTO from "./Tab/CoreWindowTabProfileDTO.js";

export default class CoreWindowProfileDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreProfileId(coreProfileId) {
        this.coreProfileId = coreProfileId;
    }

    getCoreProfileId() {
        return this.coreProfileId;
    }

    setWindowId(windowId) {
        this.windowId = windowId;
    }

    getWindowId() {
        return this.windowId;
    }

    setCoreWindowTabProfileDTOMap(coreWindowTabProfileDTOMap) {
        this.coreWindowTabProfileDTOMap = coreWindowTabProfileDTOMap;
    }

    getCoreWindowTabProfileDTOMap() {
        if (this.coreWindowTabProfileDTOMap) {
            if (!(this.coreWindowTabProfileDTOMap instanceof Map)) {
                this.coreWindowTabProfileDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWindowTabProfileDTO, this.coreWindowTabProfileDTOMap);
            }
        } else {
            this.coreWindowTabProfileDTOMap = new Map();
        }
        return this.coreWindowTabProfileDTOMap;
    }

}
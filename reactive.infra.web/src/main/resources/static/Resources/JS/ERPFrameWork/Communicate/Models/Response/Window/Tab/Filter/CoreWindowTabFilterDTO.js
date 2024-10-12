import {BaseModel} from "../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../Common/ConvertUtil.js";
import CoreWindowTabFilterFieldDTO from "./CoreWindowTabFilterFieldDTO.js";

export default class CoreWindowTabFilterDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreWindowTabId() {
        return this.coreWindowTabId;
    }

    getActiveDefault() {
        return this.activeDefault;
    }

    getRegisterKeySide() {
        return this.registerKeySide;
    }

    getCoreWindowTabFilterFieldDTOMap() {
        if (this.coreWindowTabFilterFieldDTOMap != null && !(this.coreWindowTabFilterFieldDTOMap instanceof Map)) {
            this.coreWindowTabFilterFieldDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWindowTabFilterFieldDTO, this.coreWindowTabFilterFieldDTOMap);
        }
        return this.coreWindowTabFilterFieldDTOMap;
    }
}
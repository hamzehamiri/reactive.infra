import CoreFilterAssignAbstract from "./CoreFilterAssignAbstract.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreButtonAssignElementDTO from "../Button/CoreButtonAssignElementDTO.js";
import CoreTranslateDTO from "../Translate/CoreTranslateDTO.js";

export default class CoreFilterAssignElementMasterDTO extends CoreFilterAssignAbstract {
    constructor() {
        super();
    }

    getRecordId() {
        return this.recordId;
    }

    getCoreFilterAssignAbstractMap() {
        if (this.coreFilterAssignAbstractMap && !(this.coreFilterAssignAbstractMap instanceof Map)) {
            this.coreFilterAssignAbstractMap = ConvertUtil.ConvertGeneralWithMap(CoreFilterAssignAbstract, this.coreFilterAssignAbstractMap);
        }
        return this.coreFilterAssignAbstractMap;
    }

    getCoreButtonAssignElementDTOMap() {
        if (this.coreButtonAssignElementDTOMap && !(this.coreButtonAssignElementDTOMap instanceof Map)) {
            this.coreButtonAssignElementDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreButtonAssignElementDTO, this.coreButtonAssignElementDTOMap, "id");
        }
        return this.coreButtonAssignElementDTOMap;
    }

    getCoreTranslateDTOMap() {
        if (this.coreTranslateDTOMap && !(this.coreTranslateDTOMap instanceof Map)) {
            this.coreTranslateDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreTranslateDTO, this.coreTranslateDTOMap);
        }
        return this.coreTranslateDTOMap;
    }

    getUuid() {
        return this.uuid;
    }
}
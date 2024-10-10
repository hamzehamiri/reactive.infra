import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreFilterOperationParamDTO from "./CoreFilterOperationParamDTO.js";

export default class CoreFilterOperationDTO extends BaseModel {
    constructor() {
        super();
    }

    getTitle() {
        return this.title;
    }

    getRegisterKey() {
        return this.registerKey;
    }

    getCoreFilterOperationParamDTOMap() {
        if (this.coreFilterOperationParamDTOMap && !(this.coreFilterOperationParamDTOMap instanceof Map)) {
            this.coreFilterOperationParamDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreFilterOperationParamDTO, this.coreFilterOperationParamDTOMap);
        }
        return this.coreFilterOperationParamDTOMap;
    }
}
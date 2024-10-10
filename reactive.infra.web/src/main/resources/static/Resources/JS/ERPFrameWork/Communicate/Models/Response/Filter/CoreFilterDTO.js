import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreFilterOperationDTO from "./CoreFilterOperationDTO.js";

export default class CoreFilterDTO extends BaseModel {
    constructor() {
        super();
    }

    getTitle() {
        return this.title;
    }

    getCoreFilterParentId() {
        return this.coreFilterParentId;
    }

    getCoreFilterOperationDTOMap() {
        if (this.coreFilterOperationDTOMap && !(this.coreFilterOperationDTOMap instanceof Map)) {
            this.coreFilterOperationDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreFilterOperationDTO, this.coreFilterOperationDTOMap);
        }
        return this.coreFilterOperationDTOMap;
    }
}
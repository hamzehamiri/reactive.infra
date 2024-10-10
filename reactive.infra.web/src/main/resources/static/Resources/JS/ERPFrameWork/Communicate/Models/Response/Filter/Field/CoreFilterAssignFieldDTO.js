import CoreFilterAssignAbstract from "../CoreFilterAssignAbstract.js";
import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreWindowTabFieldDTO from "../../Window/Tab/Field/CoreWindowTabFieldDTO.js";
import CoreFilterDTO from "../CoreFilterDTO.js";

export default class CoreFilterAssignFieldDTO extends CoreFilterAssignAbstract {
    constructor() {
        super();
    }

    getCoreWindowTabFieldDTO() {
        if (this.coreWindowTabFieldDTO && !(this.coreWindowTabFieldDTO.constructor.prototype instanceof BaseModel)) {
            this.coreWindowTabFieldDTO = ConvertUtil.ConvertGeneral(CoreWindowTabFieldDTO, this.coreWindowTabFieldDTO);
        }
        return this.coreWindowTabFieldDTO;
    }

    getCoreFilterDTOMap() {
        if (this.coreFilterDTOMap && !(this.coreFilterDTOMap instanceof Map)) {
            this.coreFilterDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreFilterDTO, this.coreFilterDTOMap);
        }
        return this.coreFilterDTOMap;
    }
}
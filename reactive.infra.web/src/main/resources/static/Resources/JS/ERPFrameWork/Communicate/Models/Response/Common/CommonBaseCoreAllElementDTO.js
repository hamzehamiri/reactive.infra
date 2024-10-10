import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";

export default class CommonBaseCoreAllElementDTO extends BaseModel {
    constructor() {
        super();
    }

    getSourceCoreAllElementDTO() {
        if (this.sourceCoreAllElementDTO && !(this.sourceCoreAllElementDTO.constructor instanceof BaseModel)) {
            this.sourceCoreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.sourceCoreAllElementDTO);
        }
        return this.sourceCoreAllElementDTO;
    }
}
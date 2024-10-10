import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreProcessParamDTO from "./CoreProcessParamDTO.js";
import RecordModelDTO from "../Window/Tab/RecordModelDTO.js";

export default class CoreProcessDTO extends BaseModel {
    constructor() {
        super();
    }

    getServerRegisterKey() {
        return this.serverRegisterKey;
    }

    getClientRegisterKey() {
        return this.clientRegisterKey;
    }

    getCoreProcessParamDTOMap() {
        if (this.coreProcessParamDTOMap && !(this.coreProcessParamDTOMap instanceof Map)) {
            this.coreProcessParamDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreProcessParamDTO, this.coreProcessParamDTOMap);
        }
        return this.coreProcessParamDTOMap;
    }

    getRecordModelDTO() {
        if (this.recordModelDTO && !(this.recordModelDTO instanceof BaseModel)) {
            this.recordModelDTO = ConvertUtil.ConvertGeneral(RecordModelDTO, this.recordModelDTO);
        }
        return this.recordModelDTO;
    }
}
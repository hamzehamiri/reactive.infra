import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../../../Response/Element/CoreAllElementDTO.js";
import CoreFilterRequestElementInterface from "./CoreFilterRequestElementInterface.js";

export default class CoreFilterRequestElementWithOperationParamValueDTO extends CoreFilterRequestElementInterface {
    constructor() {
        super();
    }

    setCoreAllElementDTO(coreAllElementDTO) {
        this.coreAllElementDTO = coreAllElementDTO;
    }

    setRecordId(recordId) {
        this.recordId = recordId;
    }

    setCoreFilterOperationId(coreFilterOperationId) {
        this.coreFilterOperationId = coreFilterOperationId;
    }

    setOperationParamValueMap(operationParamValueMap) {
        this.operationParamValueMap = operationParamValueMap;
    }

    getCoreAllElementDTO() {
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }

    getRecordId() {
        return this.recordId;
    }

    getCoreFilterOperationId() {
        return this.coreFilterOperationId;
    }

    getOperationParamValueMap() {
        if (this.operationParamValueMap && !(this.operationParamValueMap instanceof Map)) {
            this.operationParamValueMap = ConvertUtil.ConvertFieldValuesMap(this.operationParamValueMap);
        }
        return this.operationParamValueMap;
    }
}
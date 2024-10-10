import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreFilterRequestElementRecordDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreAllElementDTO(coreAllElementDTO) {
        this.coreAllElementDTO = coreAllElementDTO;
    }

    setRecordId(recordId) {
        this.recordId = recordId;
    }
}
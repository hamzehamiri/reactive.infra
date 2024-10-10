import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreProcessRequestStatusDTO extends BaseModel {
    constructor() {
        super();
    }
}

CoreProcessRequestStatusDTO.factory = (id, name) => {
    let data = new CoreProcessRequestStatusDTO();
    data.setId(id);
    data.setName(name);
    return data;
}

CoreProcessRequestStatusDTO.statusLifeCycle = {
    Start: CoreProcessRequestStatusDTO.factory(1, "Start"),
    Pause: CoreProcessRequestStatusDTO.factory(2, "Pause"),
    Resume: CoreProcessRequestStatusDTO.factory(3, "Resume"),
    Terminate: CoreProcessRequestStatusDTO.factory(4, "Terminate"),
}
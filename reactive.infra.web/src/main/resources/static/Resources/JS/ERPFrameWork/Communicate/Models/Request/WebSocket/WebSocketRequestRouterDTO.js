import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class WebSocketRequestRouterDTO extends BaseModel {
    constructor() {
        super();
    }

    setServiceKeyRegister(serviceKeyRegister) {
        this.serviceKeyRegister = serviceKeyRegister;
    }

    setUuid(uuid) {
        this.uuid = uuid;
    }

    setBody(body) {
        this.body = body;
    }
}
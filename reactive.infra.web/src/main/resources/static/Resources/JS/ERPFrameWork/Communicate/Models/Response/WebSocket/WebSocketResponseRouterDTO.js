import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class WebSocketResponseRouterDTO extends BaseModel {
    constructor() {
        super();
    }

    getServiceKeyRegister() {
        return this.serviceKeyRegister;
    }

    getUuid() {
        return this.uuid;
    }

    getBodyRegisterKey() {
        return this.bodyRegisterKey;
    }

    getBody() {
        return this.body;
    }

    setBody(body) {
        this.body = body;
    }
}
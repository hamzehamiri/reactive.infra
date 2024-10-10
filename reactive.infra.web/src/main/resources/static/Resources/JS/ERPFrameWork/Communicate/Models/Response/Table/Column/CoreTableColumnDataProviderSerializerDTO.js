import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreTableColumnDataProviderSerializerDTO extends BaseModel {
    constructor(clientRegisterKey) {
        super();
        this.setClientRegisterKey(clientRegisterKey);
    }

    setClientRegisterKey(clientRegisterKey) {
        this.clientRegisterKey = clientRegisterKey;
    }

    getClientRegisterKey() {
        return this.clientRegisterKey;
    }

    getServerRegisterKey() {
        return this.serverRegisterKey;
    }
}
import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreButtonDTO extends BaseModel {
    constructor() {
        super();
    }

    getCommandServerKey() {
        return this.commandServerKey;
    }

    setCommandClientKey(commandClientKey) {
        this.commandClientKey = commandClientKey;
    }

    getCommandClientKey() {
        return this.commandClientKey;
    }

    getClientUiKey() {
        return this.clientUiKey;
    }
}
import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreTenantTypeDTO extends BaseModel {
    constructor() {
        super();
    }

    setLevelIndex(levelIndex) {
        this.levelIndex = levelIndex;
    }

    getLevelIndex() {
        return this.levelIndex;
    }
}
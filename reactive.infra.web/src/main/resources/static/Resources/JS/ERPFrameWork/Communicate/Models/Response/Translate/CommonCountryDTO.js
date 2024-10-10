import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CommonCountryDTO extends BaseModel {
    constructor() {
        super();
    }

    setFlagPicPath(flagPicPath) {
        this.flagPicPath = flagPicPath;
    }

    getFlagPicPath() {
        return this.flagPicPath;
    }
}
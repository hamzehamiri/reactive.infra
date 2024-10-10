import {BaseModel} from "../../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWindowTabFieldSortOrderProfileDTO extends BaseModel {
    constructor(key) {
        super();
        this.key = key;
    }

    getKey() {
        return this.key;
    }
}

CoreWindowTabFieldSortOrderProfileDTO.Types = {
    None: new CoreWindowTabFieldSortOrderProfileDTO("none"),
    Asc: new CoreWindowTabFieldSortOrderProfileDTO('asc'),
    Desc: new CoreWindowTabFieldSortOrderProfileDTO('desc')
}
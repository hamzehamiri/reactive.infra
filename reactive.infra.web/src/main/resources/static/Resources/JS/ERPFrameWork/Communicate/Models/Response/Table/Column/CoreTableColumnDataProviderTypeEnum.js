import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreTableColumnDataProviderTypeEnum extends BaseModel {
    constructor(key) {
        super();
        this.key = key;
    }

    getKey() {
        return this.key;
    }
}

CoreTableColumnDataProviderTypeEnum.Attrib = {
    Serializer: {
        Table: new CoreTableColumnDataProviderTypeEnum('1'),
        List: new CoreTableColumnDataProviderTypeEnum('2'),
        Primary: new CoreTableColumnDataProviderTypeEnum('3'),
    }
}
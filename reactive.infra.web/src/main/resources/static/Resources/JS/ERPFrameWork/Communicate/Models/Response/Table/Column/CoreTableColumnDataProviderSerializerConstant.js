import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreTableColumnDataProviderSerializerConstant extends BaseModel {

    constructor(key) {
        super();
        this.key = key;
    }

    getKey() {
        return this.key;
    }
}

CoreTableColumnDataProviderSerializerConstant.Attrib = {
    Serializer: {
        None: '',
        DateTypePrimarySerializer: new CoreTableColumnDataProviderSerializerConstant('DateTypePrimarySerializer'),
        NumberTypePrimarySerializer: new CoreTableColumnDataProviderSerializerConstant('NumberTypePrimarySerializer'),
        StringTypePrimarySerializer: new CoreTableColumnDataProviderSerializerConstant('StringTypePrimarySerializer'),
        CoreTableSerializer : new CoreTableColumnDataProviderSerializerConstant('CoreTableSerializer'),
        KeyValueTableSerializer: new CoreTableColumnDataProviderSerializerConstant('KeyValueTableSerializer'),
        KeyValueListSerializer: new CoreTableColumnDataProviderSerializerConstant('KeyValueListSerializer'),
        AttachmentTypeSerializer: new CoreTableColumnDataProviderSerializerConstant('AttachmentTypePrimarySerializer'),
        BooleanTypePrimarySerializer: new CoreTableColumnDataProviderSerializerConstant('BooleanTypePrimarySerializer'),
        CronTypePrimarySerializer: new CoreTableColumnDataProviderSerializerConstant('CronTypePrimarySerializer'),
    }
}
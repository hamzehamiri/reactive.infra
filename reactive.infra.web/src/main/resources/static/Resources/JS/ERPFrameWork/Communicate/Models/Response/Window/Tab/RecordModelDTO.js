import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";

export default class RecordModelDTO extends BaseModel {
    constructor() {
        super();
    }

    setUUID(uuid) {
        this.uuid = uuid;
    }

    getUUID() {
        return this.uuid;
    }

    setFieldValues(fieldValues) {
        this.fieldValues = fieldValues;
    }

    getFieldValues() {
        if (!(this.fieldValues instanceof Map)) {
            this.fieldValues = ConvertUtil.ConvertFieldValuesMap(this.fieldValues);
        }
        return this.fieldValues;
    }

    getFieldValueChanges() {
        if (this.fieldValuesChanges == null)
            this.fieldValuesChanges = new Map();
        return this.fieldValuesChanges;
    }

    addFieldChanges(fieldId, value) {
        let oldArrayValue = this.getFieldValueChanges().get(fieldId);
        if (oldArrayValue == null) {
            oldArrayValue = [];
            this.getFieldValueChanges().set(fieldId, oldArrayValue);
        }
        oldArrayValue.push(value);
    }

    setPkFieldValuesMap(pkFieldValues) {
        this.pkFieldValues = pkFieldValues;
    }

    getPkFieldValues() {
        if (this.pkFieldValues && !(this.pkFieldValues instanceof Map)) {
            this.pkFieldValues = ConvertUtil.ConvertPkFieldValuesMap(this.pkFieldValues);
        }
        return this.pkFieldValues;
    }

    generatePkForRecord() {
        if (!this.pkGeneratedValue) {
            this.pkGeneratedValue = ConvertUtil.GeneratePkSerializerId(this.getPkFieldValues());
        }
        return this.pkGeneratedValue;
    }

    setDisplay(display) {
        this.display = display;
    }

    getDisplay() {
        return this.display;
    }

    getCoreExpressionEvaluateMap() {
        return this.coreExpressionEvaluateMap;
    }
}
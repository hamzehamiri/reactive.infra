import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";

export default class TemplateLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setTemplate(htmlTemplate) {
        this.htmlTemplate = htmlTemplate;
    }

    getTemplate() {
        return this.htmlTemplate;
    }

    setKeyFieldName(keyFieldName) {
        this.keyFieldName = keyFieldName;
    }

    getKeyFieldName() {
        return this.keyFieldName;
    }

    setValueFieldName(fieldName) {
        this.fieldName = fieldName;
    }

    getValueFieldName() {
        return this.fieldName;
    }
}

TemplateLayoutData.factory = function (htmlTemplate) {
    let templateLayoutData = new TemplateLayoutData();
    templateLayoutData.setTemplate(htmlTemplate);
    return templateLayoutData;
};
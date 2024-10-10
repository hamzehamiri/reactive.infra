import BaseSerializeModel from "./BaseSerializeModel.js";

export class BaseModel extends BaseSerializeModel {
    constructor() {
        super();
    }

    setUUID(uuid) {
        this.uuid = uuid;
    }

    getUUID() {
        return this.uuid;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    getId() {
        return this.id;
    }

    setTranslate(translate) {
        this.translate = translate;
    }

    setCoreTranslateLanguageDTO(coreTranslateLanguageDTO) {
        this.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
    }

    getName() {
        return this.name;
    }

    getTranslate() {
        return this.translate;
    }

    applyData(json) {
        Object.assign(this, json);
    }

    getActive() {
        return this.active;
    }
}
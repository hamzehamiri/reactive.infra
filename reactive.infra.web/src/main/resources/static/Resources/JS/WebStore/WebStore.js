import {BaseModel} from "../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../ERPFrameWork/Communicate/Common/ConvertUtil.js";

export default class WebStore {
    constructor() {
        this.mapData = new Map();
    }

    saveData(key, json) {
        this.mapData.set(key, json);
    }

    getData(key) {
        return this.mapData.get(key);
    }

    clear() {
        this.mapData.clear();
    }

    deleteKey(key) {
        this.mapData.delete(key);
    }

    convertData(model) {
        if (model.constructor.prototype instanceof BaseModel) {
            return model.toJsonString();
        } else if (model.constructor === JSON.constructor) {
            return JSON.stringify(model);
        } else {
            return model;
        }
        return model;
    }

    convertFromStore(val, Clazz) {
        if (Clazz.constructor === BaseModel.constructor) {
            return ConvertUtil.ConvertGeneral(Clazz, JSON.parse(val));
        } else if (Clazz.constructor === JSON.constructor) {
            return JSON.parse(val);
        } else {
            return val;
        }
    }
}
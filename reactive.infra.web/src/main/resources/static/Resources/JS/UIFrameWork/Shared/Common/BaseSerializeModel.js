import {Util} from "./Util.js";

export default class BaseSerializeModel {
    toJSON() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            let valB = this[b];
            if (valB != null && Array.isArray(valB)) {
                let jsonArray = [];
                valB.forEach((val) => {
                    let innerJson = {};
                    if (val instanceof BaseSerializeModel) {
                        innerJson = val.toJSON();
                    } else {
                        innerJson = val;
                    }
                    jsonArray.push(innerJson);
                });
                a[b] = jsonArray;
            } else if (valB instanceof Map) {
                let jsonMap = {};
                valB.forEach((value, key) => {
                    let innerJson = {};
                    if (value != null && Array.isArray(value)) {
                        innerJson = value.map((j) => j.toJSON());
                    } else if (value != null && typeof (value) === 'object' && 'toJSON' in value) {
                        innerJson = value.toJSON();
                    } else {
                        innerJson = value;
                    }
                    // jsonMap.push({[key]: innerJson});
                    jsonMap[key] = innerJson;
                });
                a[b] = jsonMap;
            } else if (valB != null && typeof (valB) === 'object' && 'toJSON' in valB) {
                a[b] = valB.toJSON();
            } else {
                a[b] = valB !== undefined ? valB : null;
            }
            return a;
        }, {});
    }

    toJsonString() {
        return JSON.stringify(this.toJSON());
    }

    toSerialKeyValue() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b] != null && Array.isArray(this[b])) {
                a[b] = this[b].map((j) => j.toSerialKeyValue());
            } else if (this[b] != null && typeof (this[b]) === 'object' && 'toSerialKeyValue' in this[b]) {
                a += this[b].toSerialKeyValue();
            } else {
                let valParam = (this[b] !== undefined ? this[b] : null);
                if (valParam)
                    a += "&" + b + "=" + valParam;
            }
            return a;
        }, "");
    }

    CloneOfClass() {
        return Util.CloneOfClass(this);
    }
}
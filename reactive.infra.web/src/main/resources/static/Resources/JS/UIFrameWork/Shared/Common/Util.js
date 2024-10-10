import {DOM} from "./DOM.js";
import {BodyElementWidget} from "../../HTML/Widget/BodyElementWidget.js";
import {BaseModel} from "./BaseModel.js";
import {HTMLComponent} from "../../HTML/Component/HTMLComponent.js";

export class Util {

    static convertTemplateLayoutData(valueTemplateLayoutData) {
        let findVal;
        if (valueTemplateLayoutData instanceof Array) {
            valueTemplateLayoutData.forEach((dof) => {
                if (dof.Value)
                    findVal = dof.Value;
            });
        }
        return findVal;
    }

    static findElementWithStartElement(elementStart, attributeName) {
        if (elementStart.attributes.getNamedItem(attributeName)) {
            return elementStart;
        } else if (elementStart.hasChildNodes()) {
            let childNodes = elementStart.children;
            for (const item of childNodes) {
                if (item.nodeType === Node.ELEMENT_NODE) {
                    let findElement = this.findElementWithStartElement(item, attributeName);
                    if (findElement) {
                        return findElement;
                    }
                }
            }
        }
    }

    static checkBorderWidth(item) {
        let compute = 0;
        if (item instanceof HTMLComponent) {
            compute = getComputedStyle(item.element);
        } else if (item instanceof Element) {
            compute = getComputedStyle(item);
        }

        let sizeArray = compute.getPropertyValue('border-width');
        let sizeArraySplit = sizeArray.split(' ');

        if (sizeArraySplit.length === 1) {
            return {
                all: parseInt(sizeArraySplit[0]),
            };
        } else {
            if (sizeArraySplit.length === 4) {
                return {
                    top: parseInt(sizeArraySplit[0]),
                    bottom: parseInt(sizeArraySplit[2]),
                    left: parseInt(sizeArraySplit[3]),
                    right: parseInt(sizeArraySplit[1]),
                };
            } else if (sizeArraySplit.length === 3) {
                return {
                    top: parseInt(sizeArraySplit[0]),
                    bottom: parseInt(sizeArraySplit[2]),
                    left: 0,
                    right: parseInt(sizeArraySplit[1]),
                };
            } else if (sizeArraySplit.length === 2) {
                return {
                    top: parseInt(sizeArraySplit[0]),
                    bottom: 0,
                    left: 0,
                    right: parseInt(sizeArraySplit[1]),
                };
            }
        }
    }

    static Init() {
        Util.canvas = DOM.createElement('canvas');
        DOM.addStyleAttribute(Util.canvas, "display", "none");
        let body = BodyElementWidget.get();
        body.addItem(Util.canvas);
    }

    static isEmptyString(value) {
        return value === null || value.length === 0;
    }

    static getWithOfText(text, fontName, fontSize) {
        const ctx = Util.canvas.getContext("2d");
        ctx.font = fontSize + " " + fontName;
        return ctx.measureText(text).width;
    }

    static CopyArray(source) {
        for (let index = 1; index < arguments.length; index++) {
            let arr = arguments[index];
            if (arr instanceof Array) {
                for (let arrayIndex = 0; arrayIndex < arr.length; arrayIndex++) {
                    source.push(arr[arrayIndex]);
                }
            }
        }
    }

    static CloneOfClass(clazzInstance) {
        let clone = new clazzInstance.constructor();
        for (let key in clazzInstance) {
            if (clazzInstance.hasOwnProperty(key)) {
                clone[key] = Util.ClonePrimary(clazzInstance[key]);
            }
        }
        return clone;
    }

    static ClonePrimary(val) {
        let valNew;
        if (val instanceof BaseModel) {
            valNew = val.CloneOfClass();
        } else if (val instanceof Map) {
            valNew = Util.CloneMap(val);
        } else if (val instanceof Array) {
            valNew = Util.CloneArray(val);
        } else {
            valNew = val;
        }
        return valNew;
    }

    static CloneMap(val) {
        let newMap = new Map();
        val.forEach((valueMap, keyMap) => {
            newMap.set(keyMap, Util.ClonePrimary(valueMap));
        });
        return newMap;
    }

    static CloneArray(val) {
        let newArray = [];
        val.forEach((valueArray) => {
            newArray.push(Util.ClonePrimary(valueArray))
        });
        return newArray;
    }

    static ConvertJsonToMap(jsonObject) {
        return new Map(Object.entries(jsonObject));
    }

    static ConvertMapToJson(map) {
        return Object.fromEntries(map);
    }

    static ConvertMapToArray(map) {
        return Array.from(map, ([key, value]) => {
            return value;
        });
    }

    static keyAllKeysJson(json) {
        return Object.keys(json);
    }
}
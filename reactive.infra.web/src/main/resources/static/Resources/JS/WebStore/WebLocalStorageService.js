import WebStore from "./WebStore.js";

export default class WebLocalStorageService extends WebStore {
    constructor() {
        super();
    }

    saveData(key, model) {
        super.saveData(key, model);
        localStorage.setItem(key, this.convertData(model));
    }

    getData(key) {
        return localStorage.getItem(key);
    }

    getDataByConvert(key, Clazz) {
        let val = localStorage.getItem(key);
        return val ? this.convertFromStore(val, Clazz) : null;
    }

    deleteKey(key) {
        super.deleteKey(key);
        localStorage.removeItem(key);
    }

    clear() {
        super.clear();
        localStorage.clear();
    }

}
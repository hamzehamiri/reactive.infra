import WebStore from "./WebStore.js";

export default class WebCookiesService extends WebStore {
    constructor() {
        super();
    }

    saveData(key, model) {
        super.saveData(key, model);
        this.setCookiesValue(key, this.convertData(model), 30);
    }

    setCookiesValue(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }
}
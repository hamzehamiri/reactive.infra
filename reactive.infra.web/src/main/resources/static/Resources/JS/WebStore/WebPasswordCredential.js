import WebStore from "./WebStore.js";
import {UUID} from "../UIFrameWork/Shared/Common/UUID.js";

export default class WebPasswordCredential extends WebStore {
    constructor() {
        super();
    }

    saveData(key, json) {
        super.saveData(key, json);
        if ("PasswordCredential" in window) {
            json.setId(UUID.create());
            let credential = new PasswordCredential(json.toJSON());
            navigator.credentials.store(credential);
        }
    }

}
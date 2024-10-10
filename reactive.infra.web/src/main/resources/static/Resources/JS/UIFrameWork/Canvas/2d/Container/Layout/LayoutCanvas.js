import {BaseObservable} from "../../../../Shared/Event/BaseObservable.js";

export default class LayoutCanvas extends BaseObservable {
    constructor() {
        super();
    }

    applyData(json) {
        Object.assign(this, json);
    }
}
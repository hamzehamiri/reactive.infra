import BaseSerializeModel from "../../../../../Shared/Common/BaseSerializeModel.js";

export default class Options extends BaseSerializeModel {

    constructor() {
        super();
    }

    getY() {
        return this.y;
    }
}
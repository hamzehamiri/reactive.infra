import {ShareLayoutData} from "../../../Shared/Layout/ShareLayoutData.js";

export default class CircularSVGLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setDegree(degree) {
        this.degree = degree;
    }

    getDegree() {
        return this.degree;
    }
}

CircularSVGLayoutData.factory = function (degree) {
    let ld = new CircularSVGLayoutData();
    ld.setDegree(degree);
    return ld;
};
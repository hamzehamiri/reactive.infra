import DataProviderAbstract from "../DataProviderAbstract.js";

export default class EditorColorRGBA extends DataProviderAbstract {
    constructor() {
        super();
    }

    setR(r) {
        this.r = r;
    }

    setG(g) {
        this.g = g;
    }

    setB(b) {
        this.b = b;
    }

    setAlpha(a) {
        this.a = a;
    }

    getRGBACssColor() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }

    getRGBCssColor() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    getSimpleTextRGBA() {
        return `${this.r},${this.g},${this.b},${this.a}`;
    }
}
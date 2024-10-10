import Options from "../../Events/Options.js";

export default class HighChartOptionTitle extends Options {

    constructor(text) {
        super();
    }

    setText(text) {
        this.text = text;
    }

    setAlign(align) {
        this.align = align;
    }
}

HighChartOptionTitle.Attribute = {
    Align: {
        Left: 'left'
    }
}
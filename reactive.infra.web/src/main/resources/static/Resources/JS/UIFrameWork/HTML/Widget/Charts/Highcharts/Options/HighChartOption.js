import Options from "../Events/Options.js";

export default class HighChartOption extends Options {
    constructor() {
        super();
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}
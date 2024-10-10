import {BodyElementWidget} from "../Widget/BodyElementWidget.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import HTMLContainer from "./HTMLContainer.js";

export class RootPanel extends HTMLContainer {
    constructor() {
        super();

        let that = this;
        window.addEventListener(EventFrameWork.event.resize, function () {
            that.onWindowResize(window.innerWidth, window.innerHeight - 8);
        });
    }

    onWindowResize(width, height) {
        this.setSize(width, height);
    }

    static get(id) {
        if (!this.rootPanel) {
            let root = new RootPanel();
            root.setParent(BodyElementWidget.get());
            this.rootPanel = root;
        }

        return this.rootPanel;
    }
}
import {ShareContainer} from "../../../Shared/Layout/ShareContainer.js";
import BaseCanvas2DPath from "../Components/BaseCanvas2DPath.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export default class BaseCanvas2DContainer extends BaseCanvas2DPath {
    constructor() {
        super();
    }

    setSizeHtmlContainer(width, height) {
        this.width = width;
        this.height = height;
        DOM.setAttribute(this.canvasEl, 'width', width);
        DOM.setAttribute(this.canvasEl, 'height', height);
        this.draw();
    }

    initialVariables() {
        super.initialVariables();
        this.setData(ShareContainer.Items, new Map());
    }

    getItems() {
        return this.getData().get(ShareContainer.Items);
    }

    addItem(base2DPath) {
        this.getItems().set(base2DPath.getUUID(), base2DPath);
    }

    draw() {
        this.getItems().forEach((base2DPath) => {
            if (base2DPath instanceof BaseCanvas2DPath) {
                base2DPath.draw();
                this.parentContext2D.fillStyle = base2DPath.getFillColor();
                this.parentContext2D.strokeStyle = 'white';
                this.parentContext2D.shadowColor = "black";
                this.parentContext2D.shadowBlur = 10;
                this.parentContext2D.fill(base2DPath.getPath2D());
            }
        });
    }

    isComponentInPoint(event, functionIsPointInPath) {
        let clientRect = this.canvasEl.getBoundingClientRect();
        let mouseX = event.clientX - clientRect.left;
        let mouseY = event.clientY - clientRect.top;
        this.getItems().forEach((base2DPath) => {
            let isPointInPath = this.parentContext2D.isPointInPath(base2DPath.getPath2D(), mouseX, mouseY);
            functionIsPointInPath(isPointInPath, base2DPath);
        });
    }
}
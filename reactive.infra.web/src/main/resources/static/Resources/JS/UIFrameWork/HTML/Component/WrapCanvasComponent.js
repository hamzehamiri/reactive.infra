import {DOM} from "../../Shared/Common/DOM.js";
import {HTMLComponent} from "./HTMLComponent.js";
import DragCanvas from "../../Canvas/2d/DND/DragCanvas.js";

export default class WrapCanvasComponent extends HTMLComponent {
    constructor() {
        super();
        this.canvasEl = DOM.createElement('canvas');
        this.setElement(this.canvasEl);
    }

    setBase2DContainer(base2DContainer) {
        this.base2DContainer = base2DContainer;
    }

    getBase2DContainer() {
        return this.base2DContainer;
    }

    setSize(width, height) {
        super.setSize(width, height);
        this.base2DContainer.setSizeHtmlContainer(width, height);
    }

    onLoad() {
        super.onLoad();
        DOM.setAttribute(this.canvasEl, 'WrapCanvasComponent', "True");
        this.base2DContainer.setCanvasElement(this.canvasEl);
        this.base2DContainer.setParentContext2D(this.canvasEl.getContext(CanvasContextType.Flat))
        this.base2DContainer.draw();

        this.dragCanvas = new DragCanvas();
        this.dragCanvas.setCanvasEl(this.canvasEl);
        this.dragCanvas.setBase2DContainer(this.base2DContainer);
        this.dragCanvas.start();
    }
}

export const CanvasContextType = {
    "Flat": '2d',
    'WebGL': 'WebGL',
    'WebGL2': 'webgl2',
    'WebGPU': 'webgpu',
    'BitmapRenderer': 'bitmaprenderer'
}
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class BaseView extends HTMLContainer {
    constructor(baseController) {
        super();
        this.uiElements = new Map();
        this.setController(baseController);
    }

    bindModelToUI(model) {
        this.model = model;
    }

    rebindModelToUI(model) {
        this.model = model;
    }

    setParentContainer(parentContainer) {
        this.parentContainer = parentContainer;
        this.parentContainer.addItem(this);
    }

    setController(baseController) {
        this.baseController = baseController;
    }

    getParentContainer() {
        return this.parentContainer;
    }
}


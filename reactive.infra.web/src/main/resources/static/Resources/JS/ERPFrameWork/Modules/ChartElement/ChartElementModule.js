import Module from "../Common/Module.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import ChartElementController from "./Controller/ChartElementController.js";

export default class ChartElementModule extends Module {
    static Init() {
        ModuleFactory.register("ChartElement", ChartElementModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "ChartElement";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let chartElementController = new ChartElementController(parentContainer, recordId);
        chartElementController.initWithRecordID();
        this.setController(chartElementController);
    }
}
import Module from "../../Common/Module.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";
import AnalyticReportController from "./Controller/AnalyticReportController.js";

export default class AnalyticReportModule extends Module {

    static Init() {
        ModuleFactory.register("AnalyticReport", AnalyticReportModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "AnalyticReport";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let analyticReportController = new AnalyticReportController(parentContainer, recordId);
        analyticReportController.initWithRecordID();
    }
}
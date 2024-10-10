import Module from "../Common/Module.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import DashboardController from "./Controller/DashboardController.js";

export default class DashboardModule extends Module {
    static Init() {
        ModuleFactory.register("Dashboard", DashboardModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "Dashboard";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let dashboardController = new DashboardController(parentContainer, recordId);
        dashboardController.initWithRecordID();
        this.setController(dashboardController);
    }
}
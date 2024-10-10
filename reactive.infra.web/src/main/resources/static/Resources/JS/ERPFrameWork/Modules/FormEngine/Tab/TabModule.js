import Module from "../../Common/Module.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";
import TabController from "./Controller/TabController.js";

export default class TabModule extends Module {

    static Init() {
        ModuleFactory.register("Tab", TabModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "Tab";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let tabController = new TabController(parentContainer, recordId);
        tabController.initWithRecordID();
    }
}
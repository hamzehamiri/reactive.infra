import Module from "../../Common/Module.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";

export default class AnalyticKPIModule extends Module {
    static Init() {
        ModuleFactory.register("AnalyticKPI", AnalyticKPIModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "AnalyticKPI";
    }
}
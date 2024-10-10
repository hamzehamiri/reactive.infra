import Module from "../Common/Module.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import WorkflowDesignerController from "./Controller/WorkflowDesignerController.js";

export default class WorkflowDesignerModule extends Module {
    static Init() {
        ModuleFactory.register("CoreWorkflowDesigner", WorkflowDesignerModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "CoreWorkflowDesigner";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let workflowDesignerController = new WorkflowDesignerController(parentContainer, recordId);
        workflowDesignerController.initWithRecordID();
    }
}
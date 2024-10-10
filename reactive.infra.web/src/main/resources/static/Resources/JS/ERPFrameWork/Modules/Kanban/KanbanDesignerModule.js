import Module from "../Common/Module.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import KanbanDesignerController from "./Controller/KanbanDesignerController.js";

export default class KanbanDesignerModule extends Module {
    static Init() {
        ModuleFactory.register("KanbanDesignerView", KanbanDesignerModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "KanbanDesignerView";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let workflowDesignerController = new KanbanDesignerController(parentContainer, recordId);
        workflowDesignerController.initWithRecordID();
    }
}
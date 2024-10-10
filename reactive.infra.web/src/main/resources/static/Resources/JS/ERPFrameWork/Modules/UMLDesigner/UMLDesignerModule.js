import Module from "../Common/Module.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import UMLDesignerController from "./Controller/UMLDesignerController.js";
export default class UMLDesignerModule extends Module {
    static Init() {
        ModuleFactory.register("UMLDesigner", UMLDesignerModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "UMLDesigner";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let umlDesignerController = new UMLDesignerController(parentContainer, recordId);
        umlDesignerController.initWithRecordID();
        this.setController(umlDesignerController);
    }
}
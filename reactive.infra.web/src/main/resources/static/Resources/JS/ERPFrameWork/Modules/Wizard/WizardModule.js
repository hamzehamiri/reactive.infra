import Module from "../Common/Module.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import WizardController from "./Controller/WizardController.js";

export default class WizardModule extends Module {
    static Init() {
        ModuleFactory.register("CoreWizard", WizardModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "CoreWizard";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let wizardController = new WizardController(parentContainer, recordId);
        wizardController.initWithRecordID();
    }
}
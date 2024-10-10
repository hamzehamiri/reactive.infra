import Module from "../../Common/Module.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";
import WindowGeneratorController from "./Controller/WindowGeneratorController.js";

export default class WindowGeneratorModule extends Module {
    static Init() {
        ModuleFactory.register("WindowGeneratorModule", WindowGeneratorModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "WindowGeneratorModule";
    }

    createAndAttachModule(parentContainer, recordId, coreTranslateLanguageDTO) {
        this.init();
        let windowGeneratorController = new WindowGeneratorController(parentContainer, recordId);
        windowGeneratorController.initWithRecordID(coreTranslateLanguageDTO);
        this.setController(windowGeneratorController);
    }
}
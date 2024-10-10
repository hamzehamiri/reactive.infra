import Module from "../../Common/Module.js";
import WindowController from "./Controller/WindowController.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";

export default class WindowModule extends Module {

    static Init() {
        ModuleFactory.register("Window", WindowModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "Window";
    }

    createAndAttachModule(parentContainer, recordId, coreTranslateLanguageDTO) {
        let windowController = new WindowController(parentContainer, recordId);
        windowController.initWithRecordID(coreTranslateLanguageDTO);
        this.setController(windowController);
    }
}
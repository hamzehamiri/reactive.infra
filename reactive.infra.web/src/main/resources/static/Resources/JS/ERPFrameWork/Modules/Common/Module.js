export default class Module {
    constructor() {
    }

    ModuleRegisterKey() {
        return "";
    }

    init() {

    }

    getModuleName() {
        return "name";
    }

    setFunctionFactoryModule(functionFactoryModule) {
        this.functionFactoryModule = functionFactoryModule;
    }

    createAndAttachModule(parentContainer, recordId, coreTranslateLanguageDTO) {

    }

    setController(baseController) {
        this.baseController = baseController;
    }

    getController() {
        return this.baseController;
    }
}
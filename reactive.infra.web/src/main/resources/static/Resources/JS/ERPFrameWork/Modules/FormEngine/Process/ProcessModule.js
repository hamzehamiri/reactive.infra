import Module from "../../Common/Module.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";
import ProcessController from "./Controller/ProcessController.js";
import {ModuleFunction} from "../../Common/ModuleFunctionFactory.js";
import {ConfirmPanelEvent} from "../../Common/Confirm/ConfirmPanel.js";

export default class ProcessModule extends Module {

    static Init() {
        ModuleFactory.register("Process", ProcessModule);
    }

    constructor() {
        super();
    }

    getModuleName() {
        return "Process";
    }

    createAndAttachModule(parentContainer, recordId) {
        this.init();
        let processController = new ProcessController(parentContainer, recordId);
        if (this.functionFactoryModule) {
            if (this.functionFactoryModule[ModuleFunction.RequestCancel]) {
                processController.getView().getConfirmPanel().addListener(ConfirmPanelEvent.CancelEvent, () => {
                    this.functionFactoryModule[ModuleFunction.RequestCancel]();
                });
            }
            if (this.functionFactoryModule[ModuleFunction.RequestParentModel]) {
                let parentModuleModel = this.functionFactoryModule[ModuleFunction.RequestParentModel]();
                processController.setParentModuleModel(parentModuleModel);
            }

            if (this.functionFactoryModule[ModuleFunction.DragElementMatcherFunction]) {
                let dragElementMatcherFunction = this.functionFactoryModule[ModuleFunction.DragElementMatcherFunction];
                processController.addDragElementMatcherFunction(dragElementMatcherFunction);
            }
        }
        processController.start();
    }
}
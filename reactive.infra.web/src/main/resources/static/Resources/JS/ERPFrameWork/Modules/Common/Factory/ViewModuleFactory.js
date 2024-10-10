import GlobalFactoryRegister from "../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import WindowGraphPanelView from "../../FormEngine/Window/View/WindowGraphPanelView.js";
import WindowTabPanelView from "../../FormEngine/Window/View/WindowTabPanelView.js";
import WindowGeneratorView from "../../FormEngine/WindowGenerator/View/WindowGeneratorView.js";

export default class ViewModuleFactory {
    static Init() {
        GlobalFactoryRegister.register("ViewModuleFactory", this);
        ViewModuleFactory.viewModulesMap = new Map();

        ViewModuleFactory.register(WindowGraphPanelView.registerKey(), WindowGraphPanelView);
        ViewModuleFactory.register(WindowTabPanelView.registerKey(), WindowTabPanelView);
        ViewModuleFactory.register(WindowGeneratorView.registerKey(), WindowGeneratorView);
    }

    static register(key, moduleImpl) {
        ViewModuleFactory.viewModulesMap.set(key.toLowerCase(), moduleImpl);
    }

    static factory(moduleName) {
        return ViewModuleFactory.viewModulesMap.get(moduleName.toLowerCase());
    }
}
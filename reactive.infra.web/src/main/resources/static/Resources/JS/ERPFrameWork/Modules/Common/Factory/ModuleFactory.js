import CoreAllElementDTO from "../../../Communicate/Models/Response/Element/CoreAllElementDTO.js";

export default class ModuleFactory {

    static Init() {
        ModuleFactory.modulesMap = new Map();
    }

    static register(key, moduleImpl) {
        ModuleFactory.modulesMap.set(key.toLowerCase(), moduleImpl);
    }

    static factory(moduleName) {
        return ModuleFactory.modulesMap.get(moduleName.toLowerCase());
    }

    static factoryByCoreAllElement(coreAllElement) {
        if (coreAllElement instanceof CoreAllElementDTO && coreAllElement.getRegisterKey()) {
            return ModuleFactory.factory(coreAllElement.getRegisterKey());
        }
    }
}
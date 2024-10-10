import GlobalFactoryRegister from "../../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";

export default class GadgetFactory {
    static Init() {
        GadgetFactory.gadgetMap = new Map();
        GlobalFactoryRegister.register("GadgetFactory", this);
    }

    static factory(keyCommand) {
        return GadgetFactory.gadgetMap.get(keyCommand);
    }

    static register(keyCommand, Command) {
        GadgetFactory.gadgetMap.set(keyCommand, Command);
    }
}
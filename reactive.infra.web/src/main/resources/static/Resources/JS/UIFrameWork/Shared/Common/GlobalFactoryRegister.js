export default class GlobalFactoryRegister {
    static Init() {
        GlobalFactoryRegister.mapOfFactories = new Map();
    }

    static register(key, factory) {
        GlobalFactoryRegister.mapOfFactories.set(key, factory);
    }
}
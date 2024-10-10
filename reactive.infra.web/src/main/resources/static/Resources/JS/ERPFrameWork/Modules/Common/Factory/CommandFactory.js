import GlobalFactoryRegister from "../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";

export default class CommandFactory {
    static Init() {
        CommandFactory.commandMap = new Map();
        GlobalFactoryRegister.register("CommandFactory", this);
    }

    static factory(keyCommand) {
        return CommandFactory.commandMap.get(keyCommand);
    }

    static register(keyCommand, Command) {
        CommandFactory.commandMap.set(keyCommand, Command);
    }

}
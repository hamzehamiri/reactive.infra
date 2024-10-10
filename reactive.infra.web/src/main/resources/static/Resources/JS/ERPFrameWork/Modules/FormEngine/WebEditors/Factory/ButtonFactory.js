import GlobalFactoryRegister from "../../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";

export default class ButtonFactory {

    static Init() {
        ButtonFactory.mapButtontype = new Map();
        GlobalFactoryRegister.register("buttonFactory", this);
    }

    static factory(clientUiKey, jsonAttributeMap, CommandCustomConsumer) {
        let ButtonInvoker = ButtonFactory.mapButtontype.get(clientUiKey);
        if (ButtonInvoker) {
            let buttonInvoke = new ButtonInvoker(CommandCustomConsumer, jsonAttributeMap);
            return buttonInvoke;
        }
        return null;
    }

    static register(clientUiKey, BaseButton) {
        ButtonFactory.mapButtontype.set(clientUiKey, BaseButton);
    }
}

ButtonFactory.Attribute = {
    registerTypeButton: 'registerTypeButton',
    classButton: 'classButton',
    imageIconSrc: 'imageIconSrc',
    clickCallback: 'clickCallback',
    producerDataCallback: 'producerDataCallback',
    bindDataFunction: 'bindDataFunction',
    jsonTheme: 'jsonTheme',
    buttonKey: 'buttonKey'
}
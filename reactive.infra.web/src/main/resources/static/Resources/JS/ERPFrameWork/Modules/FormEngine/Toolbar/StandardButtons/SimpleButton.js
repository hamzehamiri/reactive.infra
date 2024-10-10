import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import ButtonEditorEvent from "../../../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class SimpleButton extends BaseButtonEditor {

    static Init() {
        ButtonFactory.register(SimpleButton.clientUiKey(), SimpleButton);
    }

    static clientUiKey() {
        return "SimpleButton";
    };

    constructor(CommandCustomConsumer, attributeMap, txtButton, defaultButton) {
        super(attributeMap, txtButton, !defaultButton ? true : defaultButton);
    }

    onMouseClick(event) {
        super.onMouseClick(event);
        this.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, new ButtonEditorEvent(this, this.getButtonKey()));
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), this.getButtonGeneralClass());
    }
}
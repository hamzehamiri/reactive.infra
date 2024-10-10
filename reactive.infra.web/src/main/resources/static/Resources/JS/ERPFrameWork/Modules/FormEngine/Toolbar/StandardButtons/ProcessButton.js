import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import ButtonEditorEvent from "../../../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";

export default class ProcessButton extends BaseButtonEditor {
    static Init() {
        ButtonFactory.register(ProcessButton.clientUiKey(), ProcessButton);
    }

    static clientUiKey() {
        return "ProcessButton";
    };

    constructor(CommandCustomConsumer, attributeMap, txtButton, defaultButton) {
        super(attributeMap, txtButton, true);
    }

    onMouseClick(event) {
        super.onMouseClick(event);

        let buttonEvent = new ButtonEditorEvent(this, this.getButtonKey());
        buttonEvent.setValue(null);
        this.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, buttonEvent);
    }
}
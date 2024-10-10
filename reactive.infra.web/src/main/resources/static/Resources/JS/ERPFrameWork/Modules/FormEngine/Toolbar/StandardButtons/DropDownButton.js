import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import {ComboBoxPopup} from "../../../../../UIFrameWork/HTML/WebEditor/Combobox/Container/ComboBoxPopup.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";

export default class DropDownButton extends BaseButtonEditor {
    static Init() {
        ButtonFactory.register(DropDownButton.clientUiKey(), DropDownButton);
    }

    constructor(CommandCustomConsumer, attributeMap, txtButton, defaultButton) {
        super(attributeMap, txtButton, true);
        let popUp = new ComboBoxPopup();
        popUp.setLayout(new FitLayout());
        popUp.setMinWidth(400);
        this.setPopUp(popUp);
    }

    showPopUp() {
        if (this.popUp) {
            this.popUp.showAlign(this.parent.parentElement, this.parent.parentElement.clientWidth);
            this.fireEvent(EventFrameWork.event.Components.Combobox.ShowPopUp);
        }
    }

    static clientUiKey() {
        return "DropDownButton";
    };
}
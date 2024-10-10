import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import MultiOptionButtonEditor from "../../../../../UIFrameWork/HTML/WebEditor/Button/MultiOptionButtonEditor.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import WebEditorModelKeyDisplayArray from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditorModelKeyDisplayArray.js";
import WebEditorModelKeyDisplay from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditorModelKeyDisplay.js";
import MultiOptionButtonEditorOriginalModel from "../../../../../UIFrameWork/HTML/WebEditor/Button/MultiOptionButtonEditorOriginalModel.js";
import {CoreButtonConstantButton} from "../../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";

export default class MultiModeButton extends MultiOptionButtonEditor {
    static Init() {
        ButtonFactory.register(MultiModeButton.clientUiKey(), MultiModeButton);
    }

    static clientUiKey() {
        return "MultiMode";
    };

    constructor(CommandCustomConsumer, attributeMap) {
        super(attributeMap, null, false, MultiOptionButtonEditor.Mode.OneToggle);

        let value = new WebEditorModelKeyDisplayArray();
        value.addValue(new WebEditorModelKeyDisplay(CoreButtonConstantButton().FormView.description, "1", new MultiOptionButtonEditorOriginalModel(false)));
        value.addValue(new WebEditorModelKeyDisplay(CoreButtonConstantButton().TableView.description, "2", new MultiOptionButtonEditorOriginalModel(false)));
        value.addValue(new WebEditorModelKeyDisplay(CoreButtonConstantButton().TableFormView.description, "3", new MultiOptionButtonEditorOriginalModel(false)));

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Buttons[0]));
        this.setOptions(value);
        this.setRequestWidth(105);
    }
}
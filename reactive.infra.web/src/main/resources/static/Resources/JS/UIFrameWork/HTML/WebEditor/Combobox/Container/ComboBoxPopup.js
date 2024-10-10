import {Popup} from "../../../Popup/Popup.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";

export class ComboBoxPopup extends Popup {
    constructor() {
        super(true, true, false);
        this.setScrollTypeY(null);

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.PopupComboBox[0]));
        this.setTransitionLayoutExecute(true, () => {
            console.log("ComboBoxPopup Execute After Transition");
            this.layoutExecute();
        });
        this.setBaseHeight(250);
    }
}
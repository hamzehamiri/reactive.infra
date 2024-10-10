import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";

export default class Divider extends BaseButtonEditor {

    static Init() {
        ButtonFactory.register(Divider.clientUiKey(), Divider);
    }

    static clientUiKey() {
        return "Divider";
    };

    constructor(CommandCustomConsumer, attribute, divider_Mode) {
        super();
        this.divider_Mode = divider_Mode;
        this.setElement(DOM.createElement('hr'));

        this.bindTheme();
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getDividerComponentMasterClass());
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.DividerComponent[0]));
    }

    getDividerComponentMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.DividerComponent[1].DividerComponentMaster);
    }
}

export const Divider_Mode = {
    Vertical: 'Vertical',
    Horizontal: 'Horizontal'
};
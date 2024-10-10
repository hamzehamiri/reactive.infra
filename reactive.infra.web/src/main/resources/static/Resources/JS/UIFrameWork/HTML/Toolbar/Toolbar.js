import {RowLayout, RowLayout_Mode} from "../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {DOM} from "../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export default class Toolbar extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement('div'));
        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        this.bindTheme();
    }

    onLoad() {
        super.onLoad();

        this.getElement().setAttribute('class', this.getMasterDivToolbarClass());
    }

    bindTheme() {
        super.bindTheme();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Toolbar[0]));
    }

    setMasterDivToolbarClass(masterDivToolbar) {
        this.masterDivToolbar = masterDivToolbar;
    }

    getMasterDivToolbarClass() {
        return this.masterDivToolbar ? this.masterDivToolbar : this.getClassNamesByElement(UiFrameWorkComponent.Components.Toolbar[1].MasterDivToolbar);
    }
}
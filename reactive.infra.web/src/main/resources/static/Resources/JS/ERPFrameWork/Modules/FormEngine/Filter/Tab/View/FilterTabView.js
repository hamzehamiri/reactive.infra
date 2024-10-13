import BaseView from "../../../../Common/BaseView.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class FilterTabView extends BaseView {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WebTabFilter[0]));
    }

    onLoad() {
        super.onLoad();
    }

    getWebFilterTabMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebTabFilter[1].WebFilterTabMasterDiv)
    }
}
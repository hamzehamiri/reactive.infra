import Toolbar from "../../../../../../UIFrameWork/HTML/Toolbar/Toolbar.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {HTMLComponent} from "../../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class FilterViewPanel extends HTMLContainer {
    constructor() {
        super();

        this.filterToolbar = new Toolbar();
        this.filterFieldContainer = new HTMLContainer();
        this.filterFieldContainer.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.setScrollTypeX(HTMLComponent.ScrollType.Hidden);
        this.setScrollTypeY(HTMLComponent.ScrollType.Auto);
        this.addItem(this.filterToolbar, RowLayoutData.factory(1, 40, 2, 2, 2, 2, true));
        this.addItem(this.filterFieldContainer, RowLayoutData.factory(1, 1, 2, 2, 2, 2, true));

        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getWebFilterFilterViewPanelMasterDivClass());
        DOM.addClassName(this.filterToolbar.getElement(), this.getWebFilterFilterViewPanelToolbarMasterDivClass());
        DOM.addClassName(this.filterFieldContainer.getElement(), this.getWebFilterFilterViewPanelFilterFieldContainerClass());
    }

    getFilterToolbar() {
        return this.filterToolbar;
    }

    getFilterFieldContainer() {
        return this.filterFieldContainer;
    }

    getWebFilterFilterViewPanelMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelMasterDiv)
    }

    getWebFilterFilterViewPanelFilterFieldContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelFilterFieldContainer)
    }

    getWebFilterFilterViewPanelToolbarMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelToolbarMasterDiv)
    }
}
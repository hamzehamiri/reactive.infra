import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import {HTMLComponent} from "../../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {FitLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import GraphTabItemTitle from "./GraphTabItemTitle.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";

export default class GraphTabItem extends HTMLContainer {
    constructor() {
        super();

        this.setScrollTypeY(HTMLComponent.ScrollType.Auto);
        this.setScrollTypeX(HTMLComponent.ScrollType.Hidden)
        this.setElement(DOM.createElement('div'));
        this.setLayout(new FitLayout());
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.GraphTabItem[0]));
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), this.getGraphTabItemMasterContainer());
    }

    setTitle(title) {
        this.title = title;
        if (this.tabItemTitle && this.tabItemTitle.getAttached() && this.tabItemTitle instanceof GraphTabItemTitle) {
            this.tabItemTitle.setTitle(this.title);
        }
    }

    setTabItemTitle(tabItemTitle) {
        this.tabItemTitle = tabItemTitle;
        if (this.tabItemTitle instanceof GraphTabItemTitle) {
            // this.tabItemTitle.setCloseable(this.closeable);
            this.tabItemTitle.setTitle(this.title);
        }
    }

    getTabItemTitle() {
        return this.tabItemTitle;
    }

    getTitle() {
        return this.title;
    }

    getGraphTabItemMasterContainer() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.GraphTabItem[1].GraphTabItemMasterContainer);
    }
}
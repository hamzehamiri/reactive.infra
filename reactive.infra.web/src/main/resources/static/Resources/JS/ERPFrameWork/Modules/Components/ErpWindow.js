import {Popup} from "../../../UIFrameWork/HTML/Popup/Popup.js";
import {RegisterComponent} from "../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {RowLayout, RowLayout_Mode} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import ErpWindowTitleComponent from "./ErpWindowTitleComponent.js";
import FlexLayout, {FlexDirection} from "../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import FlexLayoutData from "../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ErpWindow extends Popup {
    constructor(resizerActive, resizeOption, dragOption, modal) {
        super(resizerActive, resizeOption, dragOption, modal);

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.header = new HTMLContainer();
        this.header.setElement(DOM.createElement("div"));

        this.content = new HTMLContainer();
        this.content.setElement(DOM.createElement("div"));

        this.addItem(this.header, RowLayoutData.factory(1, 30, 0, 0, 0, 0, true));
        this.addItem(this.content, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        this.bindTheme();
    }

    setTitle(title) {
        this.title = title;

        if (!this.erpWindowTitleComponent) {
            this.header.setLayout(new FlexLayout(FlexDirection.column));
            this.erpWindowTitleComponent = new ErpWindowTitleComponent();
            this.addTitleComponent(this.erpWindowTitleComponent, FlexLayoutData.factory(1));
        }
        this.erpWindowTitleComponent.setTitle(title);
    }

    addTitleComponent(titleComponent, layoutData) {
        this.header.addItem(titleComponent, layoutData);
    }

    getContent() {
        return this.content;
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Window[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getWindowMasterElementClass());
        DOM.addClassName(this.header.getElement(), this.getWindowHeaderClass());
        DOM.addClassName(this.content.getElement(), this.getWindowContentClass());
    }

    getWindowMasterElementClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Window[1].WindowMasterElement);
    }

    getWindowContentClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Window[1].WindowContent);
    }

    getWindowHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Window[1].WindowHeader);
    }

    static FindParentWindow(container) {
        if (!container)
            return null;
        if (container instanceof ErpWindow) {
            return container;
        }
        return ErpWindow.FindParentWindow(container.getParent());
    }
}
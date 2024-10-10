import IconButtonFloatAble from "../../../../Components/IconButtonFloatAble.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class SearchUIIconButtonFloatAble extends IconButtonFloatAble {

    constructor(parentComponent, horizontal, iconButtonFloatAbleAlignment) {
        super(parentComponent, horizontal, iconButtonFloatAbleAlignment);

        this.deleteIconButton = DOM.createElement('div');

        this.getElement().appendChild(this.deleteIconButton);

        this.bindTheme();

        DOM.addClassName(this.deleteIconButton, this.getSearchUIButtonFloatAbleDeleteIconButton());
        DOM.addClassName(this.getElement(), this.getSearchUIButtonFloatAbleMaster());
    }

    btnClick(event) {
        if (event.target === this.deleteIconButton) {
            alert("delete");
        }
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.SearchUIButtonFloatAble[0]));
    }

    mouseEnterParent(event) {
        super.mouseEnterParent(event);
        DOM.removeClassName(this.getElement(), this.getContainerHideClass());
        DOM.addClassName(this.getElement(), this.getContainerActiveClass());
    }

    mouseLeaveParent(event) {
        super.mouseLeaveParent(event);
        DOM.removeClassName(this.getElement(), this.getContainerActiveClass());
        DOM.addClassName(this.getElement(), this.getContainerHideClass());
    }

    getSearchUIButtonFloatAbleMaster() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleMaster);
    }

    getSearchUIButtonFloatAbleDeleteIconButton() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButton);
    }

    getContainerActiveClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButtonActive);
    }

    getContainerHideClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButtonHide);
    }
}
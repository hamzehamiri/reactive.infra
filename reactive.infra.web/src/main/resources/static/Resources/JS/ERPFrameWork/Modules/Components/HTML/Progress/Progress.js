import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";

export default class Progress extends HTMLComponent {
    constructor(parentComponent) {
        super();

        this.parentComponent = parentComponent;
        this.parentComponent.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, () => {
            this.setParent(this.parentComponent);
            this.onAttach(this.parentComponent.getElement());
        }, this);

        this.percentBar = DOM.createElement('div');

        this.setElement(DOM.createElement("div"));
        this.getElement().appendChild(this.percentBar);
        this.bindTheme();
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Progress[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getProgressContainerClass());
        DOM.addClassName(this.percentBar, this.getProgressBarClass());
    }

    percentDraw(percent) {
        this.percent = percent;
        if (percent === 100) {
            this.onDetach();
        }

        DOM.setWidthPercent(this.percentBar, percent);
    }

    getProgressContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Progress[1].ProgressContainer);
    }

    getProgressBarClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Progress[1].ProgressBar);
    }
}
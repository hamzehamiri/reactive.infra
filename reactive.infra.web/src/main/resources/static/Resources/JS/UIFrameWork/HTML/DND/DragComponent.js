import {HTMLComponent} from "../Component/HTMLComponent.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {Drag} from "./Drag.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";

export class DragComponent extends HTMLComponent {
    constructor(dragMode, mateSizeComponent, transitionActive) {
        super();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.DragComponent[0]));

        if (mateSizeComponent && transitionActive)
            mateSizeComponent.addStyleAttribute('transition', '0.22s all');

        this.dragger = new Drag(this, dragMode, mateSizeComponent);
    }

    onDetach() {
        super.onDetach();
        this.dragger.stopDrag();
    }

    getBorderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.DragComponent[1].Border);
    }
}
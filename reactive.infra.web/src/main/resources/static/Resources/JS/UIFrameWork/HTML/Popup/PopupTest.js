import {Popup} from "./Popup.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {DOM} from "../../Shared/Common/DOM.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import {FitLayout} from "../Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import Form1 from "../../../ERPFrameWork/Test/TestForm/Form1.js";

export class PopupTest extends Popup {
    constructor() {
        super(true);

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.PopUp[0]));
        this.setElement(DOM.createElement('div'));
        this.setLayout(new FitLayout());

        this.addListener(EventFrameWork.event.position, this.onPositionChanged, this);
        this.addListener(EventFrameWork.event.positionEnd, this.onPositionEnd, this);

        this.setHideOnOtherClick(false);

        // let form = new Form1();
        //
        // this.addItem(form);

        this.resizer.syncActivate(true, true);
    }

    onPositionChanged(baseEvent) {
        DOM.addClassName(this.getElement(), this.getPopUpDragClass());
    }

    onPositionEnd(baseEvent) {
        DOM.removeClassName(this.getElement(), this.getPopUpDragClass());
    }

    getPopUpDragClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopUp[1].PopUpDrag);
    }
}

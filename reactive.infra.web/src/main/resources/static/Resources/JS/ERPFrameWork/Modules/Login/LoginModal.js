import {Popup} from "../../../UIFrameWork/HTML/Popup/Popup.js";
import {RootPanel} from "../../../UIFrameWork/HTML/Container/RootPanel.js";
import {FitLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";

export class LoginModal extends Popup {

    constructor(loginContainer) {
        super(true, true, false);
        this.setLayout(new FitLayout())

        this.setHideOnOtherClick(false);
        this.resizer.syncActivate(true, true);

        this.addItem(loginContainer);
    }

    show(x, y) {
        RootPanel.get().clearItems();
        super.show(x, y);
    }

}
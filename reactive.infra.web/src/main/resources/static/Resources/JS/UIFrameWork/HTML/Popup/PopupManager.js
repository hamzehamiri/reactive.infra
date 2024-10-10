import {BaseObservable} from "../../Shared/Event/BaseObservable.js";
import {Popup} from "./Popup.js";
import Stack from "../../Shared/Common/Stack.js";

export class PopupManager extends BaseObservable {

    static Init() {
        PopupManager.instance = new PopupManager();
        PopupManager.map = new Map();
        PopupManager.stack = new Stack();
        PopupManager.indexPopUp = 0;
    }

    registerPopup(popup) {
        if (popup instanceof Popup) {
            PopupManager.map.set(popup.getUUID(), popup);
        }
    }

    unRegister(popup) {
        if (popup instanceof Popup) {
            PopupManager.map.delete(popup.getUUID());
        }
    }

    setActivePopUp(popup) {
        PopupManager.stack.push(popup);
        PopupManager.indexPopUp = PopupManager.indexPopUp + 1;
    }

    hideAllPopUp() {
        PopupManager.map.forEach((popup, key) => {
            if (popup instanceof Popup) {
                popup.hide();
            }
        });
    }
}
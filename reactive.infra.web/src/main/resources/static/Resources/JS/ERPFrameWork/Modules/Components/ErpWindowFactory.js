import ErpWindow from "./ErpWindow.js";
import {FitLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {BodyElementWidget} from "../../../UIFrameWork/HTML/Widget/BodyElementWidget.js";

export default class ErpWindowFactory {
    static ErpWindowCreateCenter(modal, baseHeight, hideOnOtherClick, width, height) {
        let erpWindow = new ErpWindow(true, true, true, modal);
        erpWindow.setScrollTypeY(null);
        erpWindow.setBaseHeight(baseHeight);
        erpWindow.setHideOnOtherClick(!!hideOnOtherClick);
        erpWindow.getContent().setLayout(new FitLayout());
        erpWindow.setSize(width, height);
        erpWindow.showCenterElement(BodyElementWidget.get().getElement(), width);
        return erpWindow;
    }
}
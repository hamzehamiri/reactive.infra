import {
    RowLayout,
    RowLayout_Mode
} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {Util} from "../../../../UIFrameWork/Shared/Common/Util.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import HTMLContainer from "../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import SimpleButton from "../../FormEngine/Toolbar/StandardButtons/SimpleButton.js";

export default class ConfirmPanel extends HTMLContainer {

    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
        let ok_style = {
            "classButton": "btn_ok",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/ok.svg"
        };
        let cancel_style = {
            "classButton": "btn_cancel",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/cancel.svg"
        };

        this.acceptBtn = new SimpleButton(null, Util.ConvertJsonToMap(ok_style), null, true);
        this.acceptBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(ConfirmPanelEvent.AcceptEvent);
        }, this);
        this.cancelBtn = new SimpleButton(null, Util.ConvertJsonToMap(cancel_style), null, true);
        this.cancelBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(ConfirmPanelEvent.CancelEvent);
        }, this);

        this.addItem(this.acceptBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));
        this.addItem(this.cancelBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));
    }
}

export const ConfirmPanelEvent = {
    AcceptEvent: 'AcceptEvent',
    CancelEvent: 'CancelEvent'
}
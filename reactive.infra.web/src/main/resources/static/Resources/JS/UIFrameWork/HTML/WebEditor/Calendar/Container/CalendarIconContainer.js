import HTMLContainer from "../../../Container/HTMLContainer.js";
import {RowLayout, RowLayout_Mode} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {BaseButtonEditor} from "../../Button/BaseButtonEditor.js";
import {Util} from "../../../../Shared/Common/Util.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {RowLayoutData} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";

export default class CalendarIconContainer extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        let persian_style = {
            "classButton": "btn_persian",
            "imageIconSrc": "./Resources/Themes/Img/Editors/persian-calendar.svg"
        };
        let gregorian_style = {
            "classButton": "btn_gregorian",
            "imageIconSrc": "./Resources/Themes/Img/Editors/persian-calendar.svg"
        };

        this.persianCalendarBtn = new BaseButtonEditor(Util.ConvertJsonToMap(persian_style), null, true);
        this.persianCalendarBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {

        }, this);

        this.gregorianCalendarBtn = new BaseButtonEditor(Util.ConvertJsonToMap(gregorian_style), null, true);
        this.gregorianCalendarBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {

        }, this);

        this.addItem(this.persianCalendarBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));
        this.addItem(this.gregorianCalendarBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));
    }
}
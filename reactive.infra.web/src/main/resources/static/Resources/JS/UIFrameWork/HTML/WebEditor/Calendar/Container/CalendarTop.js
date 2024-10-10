import {RowLayout, RowLayout_Mode} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {Language} from "../../../ThemeLanguage/Language.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import {RowLayoutData} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {DateConverter} from "../../../../Shared/Common/Date/DateConverter.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {BaseButtonEditor} from "../../Button/BaseButtonEditor.js";
import {Util} from "../../../../Shared/Common/Util.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export class CalendarTop extends HTMLContainer {

    constructor() {
        super();

        this.monthYearElement = DOM.createElement("div");

        let next_style = {
            "classButton": "btn_cancel",
            "imageIconSrc": "./Resources/Themes/IMG/Editors/arrow-calendar.svg"
        };

        let before_style = {
            "classButton": "btn_cancel",
            "imageIconSrc": "./Resources/Themes/IMG/Editors/arrow-calendar.svg"
        };

        this.nextButton = new BaseButtonEditor(Util.ConvertJsonToMap(next_style), null, true);
        this.nextButton.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(EventFrameWork.event.Components.PopupCalendar.NextMonth, null);
        });

        this.beforeButton = new BaseButtonEditor(Util.ConvertJsonToMap(before_style), null, true);
        this.beforeButton.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(EventFrameWork.event.Components.PopupCalendar.BeforeMonth, null);
        });


        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal))
        this.setLanguage(Language.Language_US);

        this.addItem(this.beforeButton, RowLayoutData.factory(30, 1, 0, 0, 0, 0));
        this.addItem(this.monthYearElement, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
        this.addItem(this.nextButton, RowLayoutData.factory(30, 1, 0, 0, 0, 0))
    }

    setNextBtnClass(nextBtnClass) {
        this.nextBtnClass = nextBtnClass;
    }

    setBeforeBtnClass(beforeBtnClass) {
        this.beforeBtnClass = beforeBtnClass;
    }

    setMonthYearClass(monthYearClass) {
        this.monthYearClass = monthYearClass;
    }

    bindUi(year, month_zero) {
        if (month_zero < 0) {
            month_zero = 11;
            year--;
        } else if (month_zero > 11) {
            month_zero = 0;
            year++;
        }
        this.currentMonthIndex = month_zero;
        this.currentMonthModel = DateConverter.getMonths().get(month_zero);
        this.currentYear = year;
        this.monthYearElement.innerHTML = this.currentMonthModel.getSimpleMonthName() + " / " + this.currentYear;
        this.monthYearElement.setAttribute("class", this.monthYearClass);
    }

    getCurrentMonthModel() {
        return this.currentMonthModel;
    }

    getCurrentMonthIndexZero() {
        return this.currentMonthIndex;
    }

    nextMonthGenerate() {
        let afterMonth_zero = this.getCurrentMonthIndexZero() + 1;
        this.bindUi(this.getCurrentYear(), afterMonth_zero);
    }

    beforeMonthGenerate() {
        let beforeMonth_zero = this.getCurrentMonthIndexZero() - 1;
        this.bindUi(this.getCurrentYear(), beforeMonth_zero)
    }

    getCurrentYear() {
        return this.currentYear;
    }
}

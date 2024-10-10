import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {RowLayout, RowLayout_Mode} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {CalendarTop} from "./CalendarTop.js";
import {RowLayoutData} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {CalendarCenter} from "./CalendarCenter.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import ConfirmPanel from "../../../../../ERPFrameWork/Modules/Common/Confirm/ConfirmPanel.js";
import {TimeContainer} from "./TimeContainer.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";
import CalendarIconContainer from "./CalendarIconContainer.js";

export class PopupCalendar extends HTMLContainer {
    constructor() {
        super();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.PopupCalendar[0]));
        this.setElement(DOM.createElement('div'));
        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.topCalendar = new CalendarTop();
        this.topCalendar.setMonthYearClass(this.getMonthYearClass());
        this.topCalendar.setNextBtnClass(this.getNextBtnClass());
        this.topCalendar.setBeforeBtnClass(this.getBeforeBtnClass());
        this.topCalendar.addListener(EventFrameWork.event.Components.PopupCalendar.NextMonth, this.nextMonth, this);
        this.topCalendar.addListener(EventFrameWork.event.Components.PopupCalendar.BeforeMonth, this.beforeMonth, this);

        this.centerCalendar = new CalendarCenter();
        this.centerCalendar.setTableClass(this.getTableClass());
        this.centerCalendar.setWeekNameClass(this.getWeekNameClass());
        this.centerCalendar.setDayNormalClass(this.getDayNormalClass());
        this.centerCalendar.setSelectDayClass(this.getSelectDayClass());
        this.centerCalendar.setNowDayClass(this.getNowDayClass());
        this.centerCalendar.setOtherMonthDayClass(this.getOtherMonthDayClass());

        this.timeContainer = new TimeContainer();

        this.addItem(this.topCalendar, RowLayoutData.factory(1, 30, 0, 0, 0, 0));
        this.addItem(this.centerCalendar, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
        this.addItem(this.timeContainer, RowLayoutData.factory(1, 40, 0, 0, 0, 0));
        this.addItem(this.createBottomPanel(), RowLayoutData.factory(1, 30, 0, 0, 0, 0));
    }

    createBottomPanel() {
        this.confirmPanel = new ConfirmPanel();
        this.calendarIconContainer = new CalendarIconContainer();

        let container = new HTMLContainer();
        container.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
        container.addItem(this.confirmPanel , RowLayoutData.factory(130 , 1 , 2,2,2,2, true));
        container.addItem(this.calendarIconContainer , RowLayoutData.factory(130 , 1 , 2,2,2,2, true));

        return container;
    }

    beforeMonth(event) {
        this.topCalendar.beforeMonthGenerate();
        this.centerCalendar.bindUi(this.topCalendar.getCurrentYear(), this.topCalendar.getCurrentMonthIndexZero(), 1);
    }

    nextMonth(event) {
        this.topCalendar.nextMonthGenerate();
        this.centerCalendar.bindUi(this.topCalendar.getCurrentYear(), this.topCalendar.getCurrentMonthIndexZero(), 1);
    }

    bindValue(value) {
        if (value) {
            value = new Date();
            this.centerCalendar.bindUi(value.getYear() + 1900, value.getMonth(), value.getDate());
            this.topCalendar.bindUi(value.getYear() + 1900, value.getMonth());
        }
    }

    getTableClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarTable);
    }

    getWeekNameClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarWeekName);
    }

    getDayNormalClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarDayNormal);
    }

    getSelectDayClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarSelectDay);
    }

    getNowDayClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarNowDay);
    }

    getOtherMonthDayClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarOtherMonthDay);
    }

    getMonthYearClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarMonthYear);
    }

    getNextBtnClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarNextBtn);
    }

    getBeforeBtnClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarBeforeBtn);
    }
}

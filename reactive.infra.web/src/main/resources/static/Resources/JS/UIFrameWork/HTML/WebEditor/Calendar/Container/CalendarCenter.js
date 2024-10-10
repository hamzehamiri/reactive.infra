import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DateConverter} from "../../../../Shared/Common/Date/DateConverter.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import {Language} from "../../../ThemeLanguage/Language.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";

export class CalendarCenter extends HTMLComponent {
    constructor() {
        super();
        this.table = DOM.createElement("table");
        let div = DOM.createElement("div");
        div.appendChild(this.table);
        this.setElement(div);
        this.setLanguage(Language.Language_US);

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.onClickTable.name, this);
    }

    setWidth(width) {
        super.setWidth(width);
        DOM.setWidth(this.table, width);
    }

    setSize(width, height) {
        super.setSize(width, height);
        DOM.setWidth(this.table, width);
        DOM.setHeight(this.table, height);
    }

    onClickTable(event) {
        let rowIndex = event.target.parentElement.rowIndex;
        let colIndex = event.target.cellIndex;

        console.log("Test");
    }

    setTableClass(tableClass) {
        this.tableClass = tableClass;
    }

    setWeekNameClass(weekNameClass) {
        this.weekNameClass = weekNameClass;
    }

    setDayNormalClass(dayNormalClass) {
        this.dayNormalClass = dayNormalClass;
    }

    setSelectDayClass(selectDayClass) {
        this.selectDayClass = selectDayClass;
    }

    setNowDayClass(nowDayClass) {
        this.nowDayClass = nowDayClass;
    }

    setOtherMonthDayClass(otherMonthDayClass) {
        this.otherMonthDayClass = otherMonthDayClass;
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.table, this.tableClass, true);
    }

    bindUi(year, month_zero, date) {
        DOM.removeChildNodes(this.table);

        let currentYear = year;
        let currentMonth = month_zero;
        let currentDate = date;
        let currentMonthModel = DateConverter.getMonths().get(month_zero);
        let currentIsLeapYear = DateConverter.isLeapYear(currentYear)
        let startDay = DateConverter.calcDayOfWeek(currentYear, currentMonth + 1, 1);
        let currentMonthDuration = (currentMonth === 1 && currentIsLeapYear ? 29 : currentMonthModel.getDurationDays());

        let beforeYear = null;
        let beforeMonth = null;
        let beforeMonthModel = null;
        let beforeIsLeapYear = null;

        let afterYear = null;
        let afterMonth = null;
        let afterMonthModel = null;
        let afterIsLeapYear = null;

        if (currentMonth === 0) {
            beforeMonthModel = DateConverter.getMonths().get(11);
            beforeYear = currentYear - 1;
            afterMonthModel = DateConverter.getMonths().get(1);
            afterYear = currentYear;
        } else if (currentMonth === 11) {
            beforeMonthModel = DateConverter.getMonths().get(10);
            beforeYear = currentYear;
            afterMonthModel = DateConverter.getMonths().get(0);
            afterYear = currentYear + 1;
        } else {
            beforeMonthModel = DateConverter.getMonths().get(currentMonth - 1);
            afterMonthModel = DateConverter.getMonths().get(currentMonth + 1);
            beforeYear = currentYear;
            afterYear = currentYear;
        }

        let tbody = DOM.createElement("tbody");
        let counterDayOfMonth = null;

        let tr = DOM.createElement("tr");
        for (let row = 0; row < 7; row++) {
            let dayOfWeek = DateConverter.getDayOfWeek().get(row).substring(0, 2);
            let td = DOM.createElement("td");
            DOM.addClassName(td, this.weekNameClass);
            td.innerHTML = dayOfWeek;

            tr.appendChild(td);
        }

        tbody.appendChild(tr);

        for (let row = 0; row < 5; row++) {
            let tr = DOM.createElement("tr");
            for (let col = 0; col < 7; col++) {
                let td = DOM.createElement("td");
                tr.appendChild(td);

                if (row === 0) {
                    if (col === startDay) {
                        counterDayOfMonth = 1;
                    }
                    if (col < startDay) {
                        // before Months
                        td.setAttribute("class", this.otherMonthDayClass);
                        td.innerHTML = "&nbsp;";
                    } else {
                        // Current Months
                        td.setAttribute("class", this.dayNormalClass);
                        td.innerHTML = counterDayOfMonth + "";
                        counterDayOfMonth++;
                    }
                } else if (row === 4) {
                    if (currentMonthDuration < counterDayOfMonth) {
                        // After Months
                        td.setAttribute("class", this.otherMonthDayClass);
                    } else {
                        td.setAttribute("class", this.dayNormalClass);
                        td.innerHTML = counterDayOfMonth + "";
                        counterDayOfMonth++;
                    }
                } else {
                    // Current Months
                    td.setAttribute("class", this.dayNormalClass);
                    td.innerHTML = counterDayOfMonth + "";
                    if (counterDayOfMonth != null) {
                        counterDayOfMonth++;
                    }
                }
            }
            tbody.appendChild(tr);
        }
        this.table.appendChild(tbody);
    }
}

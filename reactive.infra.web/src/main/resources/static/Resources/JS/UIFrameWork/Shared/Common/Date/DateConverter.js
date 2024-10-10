import {MonthData} from "./MonthData.js";

export class DateConverter {
    static Init() {
        this.monthsName = new Map();
        this.monthsName.set(0, new MonthData('January', 'Jan', 31));
        this.monthsName.set(1, new MonthData('February', 'Feb', 28));
        this.monthsName.set(2, new MonthData('March', 'Mar', 31));
        this.monthsName.set(3, new MonthData('April', 'Apr', 30));
        this.monthsName.set(4, new MonthData('May', 'May', 31));
        this.monthsName.set(5, new MonthData('June', 'Jun', 30));
        this.monthsName.set(6, new MonthData('July', 'Jul', 31));
        this.monthsName.set(7, new MonthData('August', 'Aug', 31));
        this.monthsName.set(8, new MonthData('September', 'Sep', 30));
        this.monthsName.set(9, new MonthData('October', 'Oct', 31));
        this.monthsName.set(10, new MonthData('November', 'Nov', 30));
        this.monthsName.set(11, new MonthData('December', 'Dec', 31));

        this.dayOfWeek = new Map();
        this.dayOfWeek.set(0, "Sunday");
        this.dayOfWeek.set(1, "Monday");
        this.dayOfWeek.set(2, "Tuesday");
        this.dayOfWeek.set(3, "Wednesday");
        this.dayOfWeek.set(4, "Thursday");
        this.dayOfWeek.set(5, "Friday");
        this.dayOfWeek.set(6, "Saturday");
    }

    static getMonths() {
        return this.monthsName;
    }

    static getDayOfWeek() {
        return this.dayOfWeek;
    }

    static getMonthModel(date) {
        return this.monthsName.get(date.getMonth());
    }

    static getDisplayDate(date) {
        return this.monthsName.get(date.getMonth()).monthName + "_" + this.dayOfWeek.get(date.getDay()) + "_" + (date.getYear() + 1900) + "_" + date.getHours() + ":" + date.getMinutes();
    }

    static calcDayOfWeek(year, month, day) {
        let a = Math.floor((14 - month) / 12);
        let y = year - a;
        let m = month + 12 * a - 2;
        let d = (day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(year / 400) + Math.floor((31 * m) / 12)) % 7;
        return d;
    }

    static isLeapYear(year) {
        return (0 === year % 4) && (0 !== year % 100) || (0 === year % 400)
    }


}

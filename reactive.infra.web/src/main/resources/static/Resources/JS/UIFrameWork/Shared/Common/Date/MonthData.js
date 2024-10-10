export class MonthData {
    constructor(monthName, simpleMonthName, durationDays) {
        this.monthName = monthName;
        this.simpleMonthName = simpleMonthName;
        this.durationDays = durationDays;
    }

    getMonthName() {
        return this.monthName;
    }

    getSimpleMonthName() {
        return this.simpleMonthName;
    }

    getDurationDays() {
        return this.durationDays;
    }
}

export default class Point {

    constructor() {
    }

    applyData(json) {
        Object.assign(this, json);
    }

    getCategory() {
        return this.category
    }

    getClientX() {
        return this.clientX;
    }

    getColor() {
        return this.color;
    }

    getColorIndex() {
        return this.colorIndex;
    }

    getDist() {
        return this.dist;
    }

    getDistX() {
        return this.dist;
    }

    getFormatPrefix() {
        return this.formatPrefix;
    }

    getId() {
        return this.id;
    }

    getIndex() {
        return this.index;
    }

    getIsInside() {
        return this.isInside;
    }

    getIsNull() {
        return this.isNull;
    }

    getName() {
        return this.name;
    }

    getNegative() {
        return this.negative;
    }

    getOptions() {
        return this.options;
    }

    getPercentage() {
        return this.percentage;
    }

    getPlotX() {
        return this.plotX;
    }

    getPlotY() {
        return this.plotY;
    }

    getSelected() {
        return this.selected;
    }

    getSeries() {
        return this.series;
    }

    getState() {
        return this.state;
    }

    getTotal() {
        return this.total;
    }

    getVisible() {
        return this.visible;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}
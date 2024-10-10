import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";

export class SideLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setSide(side) {
        this.side = side;
    }

    getSide() {
        return this.side;
    }

    setSize(size) {
        this.size = size;
    }

    getSize() {
        return this.size;
    }

    setResizable(resizable) {
        this.resizeable = resizable;
    }

    getResizeable() {
        return this.resizeable;
    }

    setCollapse(collapse) {
        this.collapse = collapse;
    }

    getCollapse() {
        return this.collapse;
    }

    setCollapsible(collapsible) {
        this.collapsible = collapsible;
    }

    getCollapsible() {
        return this.collapsible;
    }

    setDraggable(draggable) {
        this.draggable = draggable;
    }

    getDraggable() {
        return this.draggable;
    }
}

SideLayoutData.factory = function (side, size, resizable, collapse, collapsible, draggable, leftMargin, rightMargin, topMargin, bottomMargin, zIndex) {
    let sideLayoutData = new SideLayoutData();
    sideLayoutData.setSide(side);
    sideLayoutData.setSize(size);
    sideLayoutData.setResizable(resizable);
    sideLayoutData.setCollapse(collapse);
    sideLayoutData.setCollapsible(collapsible);
    sideLayoutData.setDraggable(draggable);
    sideLayoutData.setLeft_Margin(leftMargin);
    sideLayoutData.setRight_Margin(rightMargin);
    sideLayoutData.setTop_Margin(topMargin);
    sideLayoutData.setBottom_Margin(bottomMargin);
    sideLayoutData.setZIndex(zIndex);
    return sideLayoutData;
};

SideLayoutData.Side = {
    Left: 'Left',
    Right: 'Right',
    Top: 'Top',
    Bottom: 'Bottom',
    Center: 'Center'
};
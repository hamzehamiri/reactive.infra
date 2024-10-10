import {ShareLayout} from "../../../../Shared/Layout/ShareLayout.js";
import {Cursor} from "../../../../Shared/Common/DOM.js";
import {ColumnDragComponent} from "./ColumnDragComponent.js";

export class ColumnDragLayout extends ShareLayout {
    constructor(grid) {
        super(true);
        this.grid = grid;
    }

    LayoutProcessPerItem(item) {
        if (item instanceof ColumnDragComponent) {
            let tdList = item.getTdList();
            if (tdList.length > 0) {
                let firstTD = tdList[0].getBoundingClientRect();
                let lastTD = tdList[tdList.length - 1].getBoundingClientRect();

                // Fix Bug 1

                let height = lastTD.bottom - firstTD.top;
                let left = firstTD.left - (ColumnDragLayout.widthResizer / 2);
                let scrollLeftTable = this.grid.getElement().scrollLeft;
                let offsetScrollWidth = this.grid.offsetScrollWidth();
                offsetScrollWidth = this.grid.getLanguage().getIsRTL() ? -1 * offsetScrollWidth : offsetScrollWidth;

                item.setParent(this.grid);
                item.onAttach();
                item.makePositionable(true);
                item.setZIndex(this.grid.getZIndex());
                item.setCursor(Cursor.colresize);
                item.setPosition(left + scrollLeftTable + offsetScrollWidth, firstTD.top);
                item.setSize(ColumnDragLayout.widthResizer, height);
            }
        }
    }
}

ColumnDragLayout.widthResizer = 5;
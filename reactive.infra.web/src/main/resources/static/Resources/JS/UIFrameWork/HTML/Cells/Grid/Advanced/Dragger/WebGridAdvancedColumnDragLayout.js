import {ShareLayout} from "../../../../../Shared/Layout/ShareLayout.js";
import {Cursor} from "../../../../../Shared/Common/DOM.js";
import WebGridAdvancedColumnDragComponent from "./WebGridAdvancedColumnDragComponent.js";

export default class WebGridAdvancedColumnDragLayout extends ShareLayout {
    constructor(webGridAdvanced) {
        super(true);
        this.webGridAdvanced = webGridAdvanced;
    }

    LayoutProcessPerItem(item) {
        if (item instanceof WebGridAdvancedColumnDragComponent) {
            let tdList = item.getTdList();
            if (tdList.length > 0) {
                // let parentElement = this.webGridAdvanced.getElement();
                // let parentElementRect = parentElement.getBoundingClientRect();
                let firstTD = tdList[0];
                let lastTD = tdList[tdList.length - 1];
                let firstTDRect = firstTD.getBoundingClientRect();
                let lastTDRect = lastTD.getBoundingClientRect();

                let topDrag = 0/*firstTDRect.top - parentElementRect.top*/;
                let heightDrag = lastTDRect.bottom - firstTDRect.top;

                // Fix Bug 1

                let left = 0;
                if (this.webGridAdvanced.getLanguage().getIsRTL()) {
                    left = firstTD.offsetLeft/*firstTDRect.left*/ /*- parentElementRect.left*/ - (WebGridAdvancedColumnDragLayout.widthResizer / 2);
                } else {
                    left = firstTD.clientWidth + firstTD.offsetLeft - (WebGridAdvancedColumnDragLayout.widthResizer / 2);
                }
                let scrollLeftTable = this.webGridAdvanced.getElement().scrollLeft;
                // let offsetScrollWidth = this.webGridAdvanced.offsetScrollWidth();
                // offsetScrollWidth = this.webGridAdvanced.getLanguage().getIsRTL() ? -1 * offsetScrollWidth : offsetScrollWidth;

                item.setParent(this.webGridAdvanced);
                item.onAttach(this.webGridAdvanced.body.getElement());
                item.makePositionable(true);
                item.setZIndex(this.webGridAdvanced.getZIndex());
                item.setCursor(Cursor.colresize);
                item.setPosition(left + scrollLeftTable /*+ offsetScrollWidth*/, topDrag);
                item.setSize(WebGridAdvancedColumnDragLayout.widthResizer, heightDrag);
            }
        }
    }
}

WebGridAdvancedColumnDragLayout.widthResizer = 5;
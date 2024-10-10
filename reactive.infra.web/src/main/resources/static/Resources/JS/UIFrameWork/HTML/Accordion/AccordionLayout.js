import {ShareLayout} from "../../Shared/Layout/ShareLayout.js";
import AccordionLayoutData from "./AccordionLayoutData.js";
import AccordionFrame from "./AccordionFrame.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";

export default class AccordionLayout extends ShareLayout {
    constructor(mode) {
        super();
        this.mode = mode;
    }

    LayoutProcess() {
        super.LayoutProcess();
        if (this.getContainer()) {
            let that = this;
            this.getContainer().getItems().forEach((item) => {
                let layoutData = that.getLayoutData(item);
                if (layoutData instanceof AccordionLayoutData) {
                    if (!item.getAttached()) {
                        item.setParent(this.getContainer());
                        item.onAttach();
                        if (item instanceof AccordionFrame) {
                            item.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, item.titleElement, (event) => {
                                if (that.mode === AccordionLayout.Mode.AllOpen) {
                                    item.setOpen(!item.isOpen);
                                }
                            }, this);
                        }
                    }
                    item.makePositionable(false);
                }
            });
        }
    }
}

AccordionLayout.Mode = {
    OnePanel: 'OnePanel',
    AllOpen: 'AllOpen'
}
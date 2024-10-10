import DragShare from "../../Shared/DND/DragShare.js";
import DragShareFactoryFunctions from "../../Shared/DND/DragShareFactoryFunctions.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";

export default class DragSVG extends DragShare {
    constructor() {
        super();
    }

    setBaseSVGComponent(baseSVGComponent) {
        this.baseSVGComponent = baseSVGComponent;
    }

    start() {
        this.addSourceBaseSharedComponent(this.baseSVGComponent, this.baseSVGComponent.getElement(), DragShareFactoryFunctions.DNDElementMatcherFunctionSVG(this.baseSVGComponent, (baseSVGComponent) => {

        }));

        this.addListener(EventFrameWork.event.DND.DNDStartDraggingPosition, DragShareFactoryFunctions.DNDStartDraggingPositionSVG((baseSVGComponent, dragEvent) => {
            baseSVGComponent.setPositionDxDy(dragEvent.dX, dragEvent.dY);
        }));

        super.start();
    }
}
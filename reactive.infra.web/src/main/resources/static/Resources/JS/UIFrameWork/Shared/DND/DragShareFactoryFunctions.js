import BaseEvent from "../Event/BaseEvent.js";
import {DragShareKeys} from "./DragShare.js";
import BaseCanvas2DPath from "../../Canvas/2d/Components/BaseCanvas2DPath.js";

export default class DragShareFactoryFunctions {
    static DNDStartDraggingViewPortSVG(consumerFunction) {
        return (event) => {
            if (event instanceof BaseEvent) {
                let dragEvent = event.getDataKey().get(DragShareKeys.DragShareKeyPositionChange);
                let baseSVGComponent = event.getSource();
                consumerFunction(baseSVGComponent, dragEvent);
            }
        }
    }

    static DNDElementMatcherFunctionSVG(baseSVGComponent, consumerFunction) {
        return (event) => {
            let arrayBaseSVGComponents = [];
            baseSVGComponent.isComponentInPoint(event, (baseSVGComponent) => {
                arrayBaseSVGComponents.push(baseSVGComponent);
                if (consumerFunction)
                    consumerFunction(baseSVGComponent);
            });
            return arrayBaseSVGComponents;
        }
    }

    static DNDStartDraggingPositionSVG(consumerFunction) {
        return (event) => {
            if (event instanceof BaseEvent) {
                let arrayObject = event.getDataKey().get(DragShareKeys.DragShareKeyObjectSelected);
                let dragEvent = event.getDataKey().get(DragShareKeys.DragShareKeyPositionChange);
                if (arrayObject) {
                    arrayObject.forEach((baseSVGComponent) => {
                        consumerFunction(baseSVGComponent, dragEvent);
                    });
                }
            }
        }
    }

    static DNDElementMatcherFunctionCanvas(base2DContainer, canvasEl, consumerFunction) {
        return (event) => {
            let arrayBase2DPath = [];
            base2DContainer.isComponentInPoint(event, (isPointInPath, base2DPath) => {
                if (isPointInPath) {
                    arrayBase2DPath.push(base2DPath);
                    if (consumerFunction)
                        consumerFunction(base2DPath);
                }
            });
            return arrayBase2DPath;
        }
    }

    static DNDStartDraggingPositionCanvas(base2DContainer, canvasEl, consumerFunction) {
        return (event) => {
            if (event instanceof BaseEvent) {
                let arrayObject = event.getDataKey().get(DragShareKeys.DragShareKeyObjectSelected);
                let dragEvent = event.getDataKey().get(DragShareKeys.DragShareKeyPositionChange);
                if (arrayObject) {
                    base2DContainer.getParentContext2D().clearRect(0, 0, canvasEl.width, canvasEl.height);
                    arrayObject.forEach((base2DPath) => {
                        if (base2DPath instanceof BaseCanvas2DPath) {
                            base2DPath.setX(dragEvent.dX + base2DPath.getX());
                            base2DPath.setY(dragEvent.dY + base2DPath.getY());

                            consumerFunction(base2DPath, dragEvent);
                        }
                    });
                    base2DContainer.draw();
                }
            }
        }
    }
}
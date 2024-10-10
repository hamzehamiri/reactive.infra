import DragShare from "../../../Shared/DND/DragShare.js";
import DragShareFactoryFunctions from "../../../Shared/DND/DragShareFactoryFunctions.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import BaseCanvas2DPath from "../Components/BaseCanvas2DPath.js";
import MeshPoint from "../Data/MeshPoint.js";

export default class DragCanvas extends DragShare {
    constructor() {
        super();
        this.mapSourceComponentWithRectBound = new Map();
    }

    setCanvasEl(canvasEl) {
        this.canvasEl = canvasEl;
    }

    setBase2DContainer(base2DContainer) {
        this.base2DContainer = base2DContainer;
    }

    start() {
        this.addSourceBaseSharedComponent(this.base2DContainer, this.canvasEl, DragShareFactoryFunctions.DNDElementMatcherFunctionCanvas(this.base2DContainer, this.canvasEl, (basePath2d) => {
            if (basePath2d instanceof BaseCanvas2DPath) {
                this.mapSourceComponentWithRectBound.set(basePath2d.getUUID(), {
                    BasePath2DComponent: basePath2d
                });
                let offset = 8;

                let {
                    xMin,
                    yMin,
                    xMax,
                    yMax
                } = basePath2d.getBoundaryRect();

                xMin -= offset;
                yMin -= offset;
                xMax += offset;
                yMax += offset;

                let meshPoint1 = new MeshPoint();
                meshPoint1.applyData({
                    x: 0,
                    y: 0,
                    pointArray: [{x: xMin, y: yMin}, {x: xMax, y: yMin}, {x: xMax, y: yMax}, {x: xMin, y: yMax}],
                });

                let basePath = new BaseCanvas2DPath();
                basePath.setMeshPoint(meshPoint1);

                basePath2d.setBoundaryRectPath2D(basePath);
            }
        }));
        this.addListener(EventFrameWork.event.DND.DNDStartDraggingPosition, DragShareFactoryFunctions.DNDStartDraggingPositionCanvas(this.base2DContainer, this.canvasEl, (base2DPath, dragEvent) => {
            if (base2DPath instanceof BaseCanvas2DPath) {
                let rectDragPath2D = base2DPath.getBoundaryRectPath2D();
                if (rectDragPath2D instanceof BaseCanvas2DPath) {
                    rectDragPath2D.setX(dragEvent.dX + base2DPath.getX());
                    rectDragPath2D.setY(dragEvent.dY + base2DPath.getY());
                    rectDragPath2D.draw();

                    let radius = 50;

                    let gradient = this.base2DContainer.getParentContext2D().createRadialGradient(rectDragPath2D.getX(), rectDragPath2D.getY(), radius * 0.6, rectDragPath2D.getX(), rectDragPath2D.getY(), radius * 1.6);
                    gradient.addColorStop(0, '#555555');
                    gradient.addColorStop(0.5, 'lightblue');
                    gradient.addColorStop(1, '#555555');

                    this.base2DContainer.getParentContext2D().fillStyle = base2DPath.getFillColor();
                    this.base2DContainer.getParentContext2D().strokeStyle = gradient;
                    this.base2DContainer.getParentContext2D().lineWidth = 5;
                    this.base2DContainer.getParentContext2D().shadowColor = "black";
                    this.base2DContainer.getParentContext2D().stroke(rectDragPath2D.getPath2D());
                }
            }
        }));

        super.start();
    }
}
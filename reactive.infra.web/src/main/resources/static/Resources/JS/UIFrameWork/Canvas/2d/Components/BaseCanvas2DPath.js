import BaseSharedComponent from "../../../Shared/BaseShared/BaseSharedComponent.js";
import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import AlgorithmsUtil from "../../../Shared/Common/AlgorithmsUtil.js";

export default class BaseCanvas2DPath extends BaseSharedComponent {
    constructor() {
        super();
        RegisterComponent.Register(this);
    }

    setCanvasElement(canvasEl) {
        this.canvasEl = canvasEl;
    }

    setParentContext2D(parentContext2D) {
        this.parentContext2D = parentContext2D;
    }

    getParentContext2D() {
        return this.parentContext2D;
    }

    requestCaptureEvent_Window(eventName, classMethod, observer) {
        super.requestCaptureEvent_Window(eventName, classMethod, observer, true);
    }

    requestCaptureEvent_DOM(event, sourceElement, classMethod, observer) {
        return super.requestCaptureEvent_DOM(event, sourceElement, classMethod, observer, true);
    }

    setMeshPoint(meshPoint) {
        this.meshPoint = meshPoint;
        this.setPosition(meshPoint.getPosition().x, meshPoint.getPosition().y);
    }

    getMeshPoint() {
        return this.meshPoint;
    }

    getPath2D() {
        return this.path2d;
    }

    setFillColor(fillColor) {
        this.fillColor = fillColor;
    }

    getFillColor() {
        return this.fillColor;
    }

    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }

    setX(x) {
        this.x = x;
        if (this.meshPoint)
            this.meshPoint.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
        if (this.meshPoint)
            this.meshPoint.y = y;
    }

    getY() {
        return this.y;
    }

    getBoundaryRect() {
        return AlgorithmsUtil.RectBoundaryWithMeshPoint(this.getMeshPoint());
    }

    setBoundaryRectPath2D(base2DPathRect) {
        this.base2DPathRect = base2DPathRect;
    }

    getBoundaryRectPath2D() {
        return this.base2DPathRect;
    }

    draw() {
        let meshPoint = this.getMeshPoint();
        let pointArray = meshPoint.getPointArray();

        this.path2d = new Path2D();
        this.path2d.moveTo(pointArray[0].x + this.x, pointArray[0].y + this.y);
        for (let i = 0; i < pointArray.length; i++) {
            this.path2d.lineTo(pointArray[i].x + this.x, pointArray[i].y + this.y);
        }
        this.path2d.closePath();
    }

    isComponentInPoint(event, functionIsPointInPath) {

    }
}
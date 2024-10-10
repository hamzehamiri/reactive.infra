import BaseCanvas2DContainer from "../../../../../UIFrameWork/Canvas/2d/Container/BaseCanvas2DContainer.js";
import BaseCanvas2DPath from "../../../../../UIFrameWork/Canvas/2d/Components/BaseCanvas2DPath.js";
import MeshPoint from "../../../../../UIFrameWork/Canvas/2d/Data/MeshPoint.js";
import RectBase2DPath from "../../../../../UIFrameWork/Canvas/2d/Components/RectBase2DPath.js";

export default class ComplexCanvasContainer extends BaseCanvas2DContainer {
    constructor() {
        super();

        let meshPoint1 = new MeshPoint();
        meshPoint1.applyData({
            x: 0,
            y: 0,
            pointArray: [{x: 50, y: 50}, {x: 75, y: 25}, {x: 100, y: 50}, {x: 75, y: 125}, {x: 50, y: 50}],
        });
        let meshPoint2 = new MeshPoint();
        meshPoint2.applyData({
            x: 0,
            y: 130,
            pointArray: [{x: 50, y: 50}, {x: 75, y: 25}, {x: 100, y: 50}, {x: 75, y: 125}, {x: 50, y: 50}],
        });

        let meshPoint3 = new MeshPoint();
        meshPoint3.applyData({
            x: 100,
            y: 130,
            pointArray: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 50, y: 50}, {x: 0, y: 50}],
        });

        let base2dPathComplex = new BaseCanvas2DPath();
        base2dPathComplex.setFillColor("green");
        base2dPathComplex.setMeshPoint(meshPoint1);

        let base2dPathComplex2 = new BaseCanvas2DPath();
        base2dPathComplex2.setFillColor("yellow");
        base2dPathComplex2.setMeshPoint(meshPoint2);

        let rectBase2Path = new RectBase2DPath();
        rectBase2Path.setPosition(130, 30);
        rectBase2Path.setFillColor("blue");
        rectBase2Path.setHeight(60);
        rectBase2Path.setWidth(100);

        let base2dPathComplex3 = new BaseCanvas2DPath();
        base2dPathComplex3.setFillColor("red");
        base2dPathComplex3.setMeshPoint(meshPoint3);

        this.addItem(base2dPathComplex);
        this.addItem(base2dPathComplex2);
        this.addItem(rectBase2Path);
        this.addItem(base2dPathComplex3);
    }
}
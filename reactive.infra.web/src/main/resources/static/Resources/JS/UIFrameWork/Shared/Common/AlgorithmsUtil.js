import MeshPoint from "../../Canvas/2d/Data/MeshPoint.js";
import Point from "../../Canvas/2d/Data/Point.js";

export default class AlgorithmsUtil {
    static RectBoundaryWithRect(x, y, width, height) {
        return {
            xMin: x,
            yMin: y,
            xMax: x + width,
            yMax: y + height
        }
    }

    static RectBoundaryWithMeshPoint(meshPoint) {
        let xMin = Infinity, yMin = Infinity, xMax = -Infinity, yMax = -Infinity;
        if (meshPoint instanceof MeshPoint) {
            let pointArray = meshPoint.getPointArray();
            for (let i = 0; i < pointArray.length; i++) {
                let point = pointArray[i];
                let xFinal = point.x /*+ meshPoint.x*/;
                let yFinal = point.y /*+ meshPoint.y*/;
                if (point instanceof Point) {
                    xMin = Math.min(xMin, xFinal);
                    yMin = Math.min(yMin, yFinal);
                    xMax = Math.max(xMax, xFinal);
                    yMax = Math.max(yMax, yFinal);
                }
            }
        }
        return {
            xMin,
            yMin,
            xMax,
            yMax
        }
    }
}
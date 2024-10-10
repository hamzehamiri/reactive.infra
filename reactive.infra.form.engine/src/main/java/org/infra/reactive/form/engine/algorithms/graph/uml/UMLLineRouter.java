package org.infra.reactive.form.engine.algorithms.graph.uml;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UMLLineRouter {
    private int offsetFromShape = 10;

    private Map<String, UMLPoint> umlPointMap = new HashMap<>();
    private Map<String, UMLShapeRegion> umlShapeRegionHashMap = new HashMap<>();

    public UMLLineRouter() {

    }

    public void addPoint(UMLPoint umlPoint) {
        String uuidPoint = umlPoint.getUuid();
        if (uuidPoint == null) {
            uuidPoint = UUID.randomUUID().toString();
            umlPoint.setUuid(uuidPoint);
        }
        umlPointMap.put(uuidPoint, umlPoint);
    }

    public void addShapeRegion(UMLShapeRegion umlShapeRegion) {
        String umlShapeRegionUuid = umlShapeRegion.getUuid();
        if (umlShapeRegionUuid == null) {
            umlShapeRegionUuid = UUID.randomUUID().toString();
            umlShapeRegion.setUuid(umlShapeRegionUuid);
        }
        umlShapeRegionHashMap.put(umlShapeRegionUuid, umlShapeRegion);
    }

    public void generateLine() {

    }

    public void addConnectionPoint(UMLPoint srcPoint, UMLPoint destPoint) {
        destPoint.setParentPoint(srcPoint);
    }

    public static void main(String[] args) {
        UMLPoint p1 = new UMLPoint(1, 20, UMLPoint.NormalSide.Top);
        UMLPoint p2 = new UMLPoint(100, 200, UMLPoint.NormalSide.Button);
        UMLShapeRegion shape1 = new UMLShapeRegion(50, 50, 52, 60);
        UMLShapeRegion shape2 = new UMLShapeRegion(150, 150, 52, 100);
        UMLShapeRegion shape3 = new UMLShapeRegion(50, 50, 52, 60);
        UMLShapeRegion shape4 = new UMLShapeRegion(50, 50, 52, 60);

        UMLLineRouter umlLineRouter = new UMLLineRouter();
        umlLineRouter.addPoint(p1);
        umlLineRouter.addPoint(p2);
        umlLineRouter.addConnectionPoint(p1, p2);
        umlLineRouter.addShapeRegion(shape1);
        umlLineRouter.addShapeRegion(shape2);
        umlLineRouter.generateLine();
    }
}

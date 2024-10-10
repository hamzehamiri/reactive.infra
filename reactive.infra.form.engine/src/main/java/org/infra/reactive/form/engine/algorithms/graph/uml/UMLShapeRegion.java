package org.infra.reactive.form.engine.algorithms.graph.uml;

import lombok.Data;

import java.util.Map;

@Data
public class UMLShapeRegion {
    private int x;
    private int y;
    private int height;
    private int width;
    private String uuid;
    private Map<String, UMLPoint> umlPointMap;

    public UMLShapeRegion() {
    }

    public UMLShapeRegion(int x, int y, int height, int width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}

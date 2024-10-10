package org.infra.reactive.form.engine.algorithms.graph.uml;

import lombok.Data;

@Data
public class UMLPoint {
    public enum NormalSide {
        Top, Button, Left, Right;
    }

    private int x;
    private int y;
    private NormalSide normalSide;
    private UMLPoint parentPoint;
    private String uuid;

    public UMLPoint() {

    }

    public UMLPoint(int x, int y, NormalSide normalSide) {
        this.x = x;
        this.y = y;
        this.normalSide = normalSide;
    }
}

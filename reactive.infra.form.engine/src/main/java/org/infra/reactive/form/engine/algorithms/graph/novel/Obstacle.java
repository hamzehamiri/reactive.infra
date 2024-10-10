package org.infra.reactive.form.engine.algorithms.graph.novel;

public class Obstacle {
    int x;
    int y;
    int width;
    int height;

    public Obstacle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Method to check if a point is inside the obstacle
    boolean containsPoint(Point p) {
        return p.x >= this.x && p.x <= this.x + this.width &&
                p.y >= this.y && p.y <= this.y + this.height;
    }
}

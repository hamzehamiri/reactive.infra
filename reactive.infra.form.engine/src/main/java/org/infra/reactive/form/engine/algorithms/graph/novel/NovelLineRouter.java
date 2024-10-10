package org.infra.reactive.form.engine.algorithms.graph.novel;

import java.util.ArrayList;
import java.util.List;

public class NovelLineRouter {
    private List<Point> points;
    private List<Obstacle> obstacles;

    public NovelLineRouter(List<Point> points, List<Obstacle> obstacles) {
        this.points = points;
        this.obstacles = obstacles;
    }

    public void routeLines() {
        for (int i = 0; i < points.size(); i++) {
            for (int j = i + 1; j < points.size(); j++) {
                if (!isLineIntersectingObstacle(points.get(i), points.get(j))) {
                    System.out.println("Drawing line between " + points.get(i).x + "," + points.get(i).y + " and " + points.get(j).x + "," + points.get(j).y);
                } else {
                    System.out.println("Cannot draw line between " + points.get(i).x + "," + points.get(i).y + " and " + points.get(j).x + "," + points.get(j).y + " due to obstacle");
                }
            }
        }
    }

    private boolean isLineIntersectingObstacle(Point start, Point end) {
        for (Obstacle obstacle : obstacles) {
            if (obstacle.containsPoint(start) || obstacle.containsPoint(end)) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        List<Point> points = new ArrayList<>();
        points.add(new Point(10, 20));
        points.add(new Point(30, 40));
        points.add(new Point(50, 60));

        List<Obstacle> obstacles = new ArrayList<>();
        obstacles.add(new Obstacle(25, 35, 10, 10)); // Example obstacle

        NovelLineRouter router = new NovelLineRouter(points, obstacles);
        router.routeLines();
    }
}

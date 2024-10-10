package org.infra.reactive.form.engine.algorithms.graph.lee;

import java.util.LinkedList;
import java.util.Queue;

public class LeesAlgorithmWithObstacles {
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    private static final int FREE_SPACE = 0;
    private static final int OBSTACLE = 1;
    private static final int START_POINT = -1;
    private static final int END_POINT = 2;
    private static int[][] grid;

    public static void main(String[] args) {
        // Example grid
        grid = new int[][]{
                {0, 0, 0, 0, 0},
                {0, 1, 1, 0, 0},
                {0, 0, 1, 0, 0},
                {0, 1, 0, 0, 0},
                {0, 0, 1, 1, 0}
        };

        // Coordinates of start and end points
        int startX = 0, startY = 0; // Assuming start at top-left corner
        int endX = 4, endY = 4; // Assuming end at bottom-right corner

        // Initialize visited and parent arrays
        boolean[][] visited = new boolean[grid.length][grid[0].length];
        int[][] parent = new int[grid.length][grid[0].length];

        // Perform BFS
        bfs(grid, startX, startY, endX, endY, visited, parent);

        // Reconstruct and print path
        reconstructPath(startX, startY, endX, endY, parent);
    }

    private static void bfs(int[][] grid, int startX, int startY, int endX, int endY, boolean[][] visited, int[][] parent) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{startX, startY});
        visited[startX][startY] = true;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0], y = current[1];

            if (x == endX && y == endY) {
                return; // Found the end point
            }

            for (int[] direction : DIRECTIONS) {
                int newX = x + direction[0], newY = y + direction[1];
                if (isValid(grid, newX, newY) &&!visited[newX][newY]) {
                    queue.offer(new int[]{newX, newY});
                    visited[newX][newY] = true;
                    parent[newX][newY] = x * grid.length + y; // Store parent index
                }
            }
        }
    }

    private static boolean isValid(int[][] grid, int x, int y) {
        return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length && grid[x][y]!= OBSTACLE;
    }

    private static void reconstructPath(int startX, int startY, int endX, int endY, int[][] parent) {
        if (parent[endX][endY] == -1) {
            System.out.println("No path found.");
            return;
        }

        StringBuilder path = new StringBuilder();
        int x = endX, y = endY;
        while (true) {
            path.insert(0, "(" + x + ", " + y + ") ");
            if (x == startX && y == startY) break;
            x = parent[x][y] / grid.length;
            y = parent[x][y] % grid.length;
        }

        System.out.println("Shortest path: " + path.toString());
    }
}

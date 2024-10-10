package org.infra.reactive.form.engine.algorithms.graph.manhatan;

import java.util.*;

public class ManhattanRouting {
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public static void main(String[] args) {
        // Example grid
        int[][] grid = {
                {0, 0, 0, 0, 0},
                {0, 1, 0, 0, 0},
                {0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0}
        };

        // Start and end points
        int startX = 0;
        int startY = 0;
        int endX = 4;
        int endY = 4;

        // Find the shortest path
        List<int[]> path = findShortestPath(grid, startX, startY, endX, endY);

        // Print the path
        if (!path.isEmpty()) {
            System.out.println("Path found:");
            for (int[] point : path) {
                System.out.print("(" + point[0] + ", " + point[1] + ") ");
            }
        } else {
            System.out.println("No path found.");
        }
    }

    private static List<int[]> findShortestPath(int[][] grid, int startX, int startY, int endX, int endY) {
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[grid.length][grid[0].length];
        List<int[]> path = new ArrayList<>();

        queue.offer(new int[]{startX, startY});
        visited[startX][startY] = true;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0];
            int y = current[1];

            if (x == endX && y == endY) {
                return reconstructPath(path, current);
            }

            for (int[] direction : DIRECTIONS) {
                int newX = x + direction[0];
                int newY = y + direction[1];

                if (isValid(grid, newX, newY) &&!visited[newX][newY]) {
                    queue.offer(new int[]{newX, newY});
                    visited[newX][newY] = true;
                    path.add(new int[]{newX, newY});
                }
            }
        }

        return Collections.emptyList();
    }

    private static boolean isValid(int[][] grid, int x, int y) {
        return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length && grid[x][y] == 0;
    }

    private static List<int[]> reconstructPath(List<int[]> path, int[] current) {
        List<int[]> reconstructedPath = new ArrayList<>(path);
        while (current!= null) {
            reconstructedPath.add(current);
            current = path.get(path.indexOf(current) - 1);
        }
        Collections.reverse(reconstructedPath);
        return reconstructedPath;
    }
}

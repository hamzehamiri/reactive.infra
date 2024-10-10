package org.infra.reactive.form.engine.algorithms.graph.lee;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class LeesAlgorithm {
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // Up, Down, Left, Right

    public static void main(String[] args) {
        int gridSize = 16;
        boolean[][] grid = new boolean[gridSize][gridSize]; // Assuming true represents an obstacle
        int startX = 0, startY = 0; // Starting point
        int endX = 14, endY = 14; // Ending point

        // Initialize grid with obstacles
        // Example: Set obstacles at positions (6,7) and (8,9)
        grid[6][7] = true;
        grid[8][9] = true;

        // Run Lee's Algorithm
        leesAlgorithm(grid, startX, startY, endX, endY);

        // Print the result
        printGrid(grid);
    }

    private static void leesAlgorithm(boolean[][] grid, int startX, int startY, int endX, int endY) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] distances = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            Arrays.fill(distances[i], Integer.MAX_VALUE); // Initialize all distances to MAX_VALUE
        }
        distances[startX][startY] = 0; // Distance from start to itself is 0

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{startX, startY});

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0], y = current[1];

            for (int[] direction : DIRECTIONS) {
                int newX = x + direction[0], newY = y + direction[1];
                if (newX >= 0 && newX < rows && newY >= 0 && newY < cols &&!grid[newX][newY]) {
                    int newDistance = distances[x][y] + 1; // Assuming movement costs 1 unit
                    if (newDistance < distances[newX][newY]) {
                        distances[newX][newY] = newDistance;
                        queue.offer(new int[]{newX, newY});
                    }
                }
            }
        }
    }

    private static void printGrid(boolean[][] grid) {
        for (boolean[] row : grid) {
            for (boolean cell : row) {
                System.out.print(cell? "O" : " "); // O for obstacle, space for open area
            }
            System.out.println();
        }
    }
}

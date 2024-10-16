package org.infra.reactive.form.engine.algorithms.graph.maze.sol1;

import java.util.ArrayList;
import java.util.Random;

public class Generator {
    public static int[][] generateRandomGameBoard(int sizeOfBoard) {
        // Initialise board
        int[][] gameBoard = new int[sizeOfBoard][sizeOfBoard];

        // Initialise the game board with obstacles and rewards
        Random random = new Random();
        double rewardProbability = 0.2;

        for (int i = 0; i < sizeOfBoard; i++) {
            for (int j = 0; j < sizeOfBoard; j++) {
                // Randomly assign obstacles or rewards based on probability
                if (random.nextDouble() < rewardProbability) {
                    gameBoard[i][j] = 2; // Reward placing
                } else {
                    gameBoard[i][j] = 1; // Free path '1'
                }
            }
        }

        // Set starting and ending point
        gameBoard[0][0] = 1;
        gameBoard[sizeOfBoard - 1][sizeOfBoard - 1] = 3;

        return gameBoard;
    }

    public static ArrayList<Integer> generateRandomGameSolution(int[][] matrix) {
        int N = matrix.length;

        // Empty solution initialisation
        ArrayList<Integer> solution = new ArrayList<>();

        // Starting point
        int currentX = 0;
        int currentY = 0;

        Random random = new Random();

        while (matrix[currentX][currentY] != 3) {
            // Random move (0: up, 1: right, 2: down, 3: left)
            int directionToMove = random.nextInt(4);

            switch (directionToMove) {
                case 0: // up
                    if (currentY > 0 && (matrix[currentX][currentY - 1] == 1 || matrix[currentX][currentY - 1] == 2 || matrix[currentX][currentY - 1] == 3)) {
                        currentY--;
                        solution.add(0);
                    }
                    break;
                case 1: // right
                    if (currentX < N - 1 && (matrix[currentX + 1][currentY] == 1 || matrix[currentX + 1][currentY] == 2 || matrix[currentX + 1][currentY] == 3)) {
                        currentX++;
                        solution.add(1);
                    }
                    break;
                case 2: // down
                    if (currentY < N - 1 && (matrix[currentX][currentY + 1] == 1 || matrix[currentX][currentY + 1] == 2 || matrix[currentX][currentY + 1] == 3)) {
                        currentY++;
                        solution.add(2);
                    }
                    break;
                case 3: // left
                    if (currentX > 0 && (matrix[currentX - 1][currentY] == 1 || matrix[currentX - 1][currentY] == 2 || matrix[currentX - 1][currentY] == 3)) {
                        currentX--;
                        solution.add(3);
                    }
                    break;
                default:
                    break;
            }
        }

        return solution;
    }
}

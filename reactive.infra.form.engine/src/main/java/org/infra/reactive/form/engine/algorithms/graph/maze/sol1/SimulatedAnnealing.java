package org.infra.reactive.form.engine.algorithms.graph.maze.sol1;

import java.util.ArrayList;

public class SimulatedAnnealing {
    // Global variables
    public static double Temperature = 10000;
    static final double minTemperature = 0.0001;
    static final double alpha = 0.8;
    static final int numIterations = 100;
    public static int currentIteration = 0;

    public static void main(String[] args) {
        int[][] matrix = Generator.generateRandomGameBoard(300);
        // System.out.println("BOARD: " + Arrays.deepToString(matrix));
        ArrayList<Integer> solution = simulatedAnnealing(matrix);
        System.out.println("\u001B[32mMOST OPTIMAL SOLUTION SIZE (STEPS): " + solution.size() + "\u001B[0m");
    }

    public static ArrayList<Integer> simulatedAnnealing(int[][] gameBoard) {
        ArrayList<Integer> currentSolution = Generator.generateRandomGameSolution(gameBoard);
        double currentFitness = Fitness.fitnessFunction(currentSolution, gameBoard);

        // Store initial solution size
        int initialSolutionSize = currentSolution.size();

        // Initialise reward counter
        int rewardCount = 0;


        while (Temperature > minTemperature) {
            for (int i = 0; i < numIterations; i++) {
                currentIteration++;
                ArrayList<Integer> newSolution = Operator.smallChangeOperator(currentSolution, gameBoard);
                double newFitness = Fitness.fitnessFunction(newSolution, gameBoard);

                double deltaFitness = newFitness - currentFitness;
                if (deltaFitness > 0 || Math.exp(deltaFitness / Temperature) > Math.random()) {
                    currentSolution = newSolution;
                    currentFitness = newFitness;
                    System.out.println("ITERATION: " + currentIteration);
                    System.out.println("CURRENT TEMPERATURE: " + Temperature);
                    System.out.println("NEW SOLUTION SIZE: " + currentSolution.size()); // Print new solution size (For smaller boards can print board: System.out.println("NEW SOLUTION: " + currentSolution);
                    System.out.println("---------------------------------------------------------");
                    // try {
                    //     Thread.sleep(100); // 100-ms delay
                    // } catch (InterruptedException e) {
                    //     e.printStackTrace();
                    // }

                    // Update reward count
                    rewardCount = Fitness.countCollectedRewards(currentSolution, gameBoard);
                }
            }
            Temperature *= alpha; // Update temperature
        }
        int finalSolutionSize = currentSolution.size();
        double improvement = Math.round(initialSolutionSize / finalSolutionSize);

        // Print initial solution size and improvement multiplicity
        System.out.println("\u001B[33mCOLLECTED REWARDS COUNT: " + rewardCount + "\u001B[33m");
        System.out.println("\u001B[34mIMPROVEMENT: " + improvement + " TIMES BETTER" + "\u001B[0m");
        System.out.println("\u001B[31mINITIAL SOLUTION SIZE (STEPS): " + initialSolutionSize + "\u001B[0m");

        return currentSolution;
    }
}

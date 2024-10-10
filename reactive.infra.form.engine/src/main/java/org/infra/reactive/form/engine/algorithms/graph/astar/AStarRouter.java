package org.infra.reactive.form.engine.algorithms.graph.astar;

import java.util.*;

public class AStarRouter {

    public static class Cell {
        public int parent_i, parent_j;
        public double f, g, h;

        Cell() {
            this.parent_i = 0;
            this.parent_j = 0;
            this.f = 0;
            this.g = 0;
            this.h = 0;
        }
    }

    private int RowMax;
    private int ColMax;
    private int[][] gridBlockCell;
    private boolean[][] closedList;
    private Cell[][] cellDetails;

    public AStarRouter() {

    }

    public void setGridBlockCell(int[][] gridBlockCell) {
        this.gridBlockCell = gridBlockCell;
        initialValue();
    }

    private void initialValue() {
        this.RowMax = gridBlockCell.length;
        this.ColMax = gridBlockCell[0].length;

        this.closedList = new boolean[RowMax][ColMax];
        this.cellDetails = new Cell[RowMax][ColMax];

        for (int row = 0; row < RowMax; row++) {
            for (int col = 0; col < ColMax; col++) {
                cellDetails[row][col] = new Cell();
                cellDetails[row][col].f = Double.POSITIVE_INFINITY;
                cellDetails[row][col].g = Double.POSITIVE_INFINITY;
                cellDetails[row][col].h = Double.POSITIVE_INFINITY;
                cellDetails[row][col].parent_i = -1;
                cellDetails[row][col].parent_j = -1;
            }
        }
    }

    public void router(int[] src, int[] des) {
        int row = src[0], col = src[1];
        cellDetails[row][col].f = 0;
        cellDetails[row][col].g = 0;
        cellDetails[row][col].h = 0;
        cellDetails[row][col].parent_i = row;
        cellDetails[row][col].parent_j = col;

        Map<Double, int[]> openList = new HashMap<>();
        openList.put(0.0, new int[]{row, col});

        int[][] directions = new int[][]{{-1, 0}, {1, 0}, {0, 1}, {0, -1}, {-1, 1}, {-1, -1}, {1, 1}, {1, -1}};
        double[] directionsEffected = new double[]{1, 1, 1, 1, 1.414, 1.414, 1.414, 1.414};

        boolean foundDest = false;
        while (!openList.isEmpty()) {
            Map.Entry<Double, int[]> p = openList.entrySet().iterator().next();
            openList.remove(p.getKey());

            row = p.getValue()[0];
            col = p.getValue()[1];
            closedList[row][col] = true;

            System.out.printf("Key : %s Value : %s%n", p.getKey() , AStarRouter.convert(p.getValue()));

            double gNew, hNew, fNew;

            for (int i = 0; i < directions.length; i++) {
                int[] direction = directions[i];
                double percent = directionsEffected[i];

                int dRow = direction[0], dCol = direction[1];
                int newRow = row + dRow;
                int newCol = col + dCol;
                if (isValid(newRow, newCol)) {
                    if (isDestination(newRow, newCol, des)) {
                        cellDetails[newRow][newCol].parent_i = row;
                        cellDetails[newRow][newCol].parent_j = col;
                        tracePath(cellDetails, des);
                        foundDest = true;
                        return;
                    } else if (!closedList[newRow][newCol] && isUnBlocked(gridBlockCell, newRow, newCol)) {
                        gNew = cellDetails[row][col].g + percent;
                        hNew = calculateHValue(newRow, newCol, des);
                        fNew = gNew + hNew;

                        if (cellDetails[newRow][newCol].f == Double.POSITIVE_INFINITY || cellDetails[newRow][newCol].f > fNew) {
                            openList.put(fNew, new int[]{newRow, newCol});

                            cellDetails[newRow][newCol].f = fNew;
                            cellDetails[newRow][newCol].g = gNew;
                            cellDetails[newRow][newCol].h = hNew;
                            cellDetails[newRow][newCol].parent_i = row;
                            cellDetails[newRow][newCol].parent_j = col;
                        }
                    }
                }
            }
        }
    }

    private double calculateHValue(int row, int col, int[] dest) {
        return Math.sqrt((row - dest[0]) * (row - dest[0]) + (col - dest[1]) * (col - dest[1]));
    }

    private boolean isUnBlocked(int[][] grid, int row, int col) {
        return grid[row][col] == 1;
    }

    private boolean isValid(int row, int col) {
        return (row >= 0) && (row < RowMax) && (col >= 0) && (col < ColMax);
    }

    private boolean isDestination(int row, int col, int[] dest) {
        return row == dest[0] && col == dest[1];
    }

    public static String convert(int[] digits) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int digit : digits) {
            stringBuilder.append(digit).append(" - ");
        }

        return stringBuilder.toString();
    }

    private void tracePath(Cell[][] cellDetails, int[] dest) {
        int row = dest[0];
        int col = dest[1];

        Map<int[], Boolean> path = new LinkedHashMap<>();

        while (!(cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col)) {
            path.put(new int[]{row, col}, true);
            int temp_row = cellDetails[row][col].parent_i;
            int temp_col = cellDetails[row][col].parent_j;
            row = temp_row;
            col = temp_col;
        }

        path.put(new int[]{row, col}, true);
        List<int[]> pathList = new ArrayList<>(path.keySet());
        Collections.reverse(pathList);

        pathList.forEach(p -> {
            if (p[0] == 2 || p[0] == 1) {
                System.out.print("-> (" + p[0] + ", " + (p[1]) + ")");
            } else {
                System.out.print("-> (" + p[0] + ", " + p[1] + ")");
            }
        });
    }

    public static void main(String[] args) {
        AStarRouter router = new AStarRouter();
        router.setGridBlockCell(new int[][]{
                {1, 0, 1, 1, 1, 1, 0, 1, 1, 1},
                {1, 1, 1, 0, 1, 1, 1, 0, 1, 1},
                {1, 1, 1, 0, 1, 1, 0, 1, 0, 1},
                {0, 0, 1, 0, 1, 0, 0, 0, 0, 1},
                {1, 1, 1, 0, 1, 1, 1, 0, 1, 0},
                {1, 0, 1, 1, 1, 1, 0, 1, 0, 0},
                {1, 0, 0, 0, 0, 1, 0, 0, 0, 1},
                {1, 0, 1, 1, 1, 1, 0, 1, 1, 1},
                {1, 1, 1, 0, 0, 0, 1, 0, 0, 1}
        });
        router.router(new int[]{8, 0}, new int[]{0, 0});
    }
}

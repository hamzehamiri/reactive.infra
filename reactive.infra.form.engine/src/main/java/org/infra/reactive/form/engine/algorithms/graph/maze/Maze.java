package org.infra.reactive.form.engine.algorithms.graph.maze;

import java.util.*;

public class Maze {
    private static final int UNVISITED = 0;
    private static final int OBSTACLE = 1;
    private static final int PATH = 2;

    private int[][] maze; // The maze represented as a 2D array
    private Node[][] nodes; // Nodes for each cell in the maze

    public Maze(int width, int height) {
        this.maze = new int[width][height];
        this.nodes = new Node[width][height];
        initializeMaze(width, height);
    }

    private void initializeMaze(int width, int height) {
        Random random = new Random();
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (i != (width - 1) && j != (height - 1) && i == 0 && j == 0 && random.nextBoolean()) { // 50% chance to place an obstacle
                    maze[i][j] = OBSTACLE;
                } else {
                    maze[i][j] = UNVISITED;
                }
                nodes[i][j] = new Node(i, j, Integer.MAX_VALUE, Integer.MAX_VALUE);
            }
        }
    }

    public boolean solveMaze(int startX, int startY, int endX, int endY) {
        PriorityQueue<Node> queue = new PriorityQueue<>(Comparator.comparingInt(node -> node.f));
        Node startNode = nodes[startX][startY];
        Node endNode = nodes[endX][endY];

        startNode.g = 0;
        startNode.h = Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
        startNode.f = startNode.g + startNode.h;

        queue.add(startNode);

        while (!queue.isEmpty()) {
            Node currentNode = queue.poll();

            if (currentNode.x == endNode.x && currentNode.y == endNode.y) {
                return true;
            }

            List<Node> neighbors = getNeighbors(currentNode.x, currentNode.y);
            for (Node neighbor : neighbors) {
                if (neighbor.x >= 0 && neighbor.x < maze.length &&
                        neighbor.y >= 0 && neighbor.y < maze[0].length &&
                        maze[neighbor.x][neighbor.y] != OBSTACLE &&
                        maze[neighbor.x][neighbor.y] != PATH) {

                    neighbor.g = currentNode.g + 1;
                    neighbor.h = Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y);
                    neighbor.f = neighbor.g + neighbor.h;
                    queue.add(neighbor);
                }
            }
        }

        return false;
    }

    private List<Node> getNeighbors(int x, int y) {
        List<Node> neighbors = new ArrayList<>();
        int[] dx = {-1, 0, 1, 0};
        int[] dy = {0, 1, 0, -1};

        for (int i = 0; i < 4; i++) {
            int newX = x + dx[i];
            int newY = y + dy[i];

            if (newX >= 0 && newY >= 0 && newX < nodes.length && newY < nodes[0].length && !nodes[newX][newY].isVisited) {
                neighbors.add(nodes[newX][newY]);
                nodes[newX][newY].isVisited = true;
            }
        }

        return neighbors;
    }

    class Node {
        int x, y;
        int g, h, f;
        Node parent; // Reference to the parent node
        boolean isVisited = false; // New field to mark if the node has been visited

        public Node(int x, int y, int g, int h) {
            this.x = x;
            this.y = y;
            this.g = g;
            this.h = h;
            this.f = g + h;
        }
    }

    public void printPath(Node endNode) {
        if (endNode.parent == null) {
            System.out.println("No path found.");
            return;
        }
        Stack<Node> pathStack = new Stack<>();
        Node currentNode = endNode;
        while (currentNode != null) {
            currentNode.isVisited = true;
            pathStack.push(currentNode);
            currentNode = currentNode.parent;
        }
        System.out.println("Path: ");
        while (!pathStack.isEmpty()) {
            Node node = pathStack.pop();
            System.out.print("(" + node.x + "," + node.y + ") ");
        }
        System.out.println("\nEnd");
    }

    public static void main(String[] args) {
        Maze maze = new Maze(4, 4); // Create a 10x10 maze
        System.out.println("Solving maze...");
        if (maze.solveMaze(0, 0, 3, 3)) {
            System.out.println("Path found!");
            maze.printPath(maze.nodes[3][3]); // Print the path from the end node
        } else {
            System.out.println("No path found.");
        }
    }
}
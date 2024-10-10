package org.infra.reactive.form.engine.algorithms.graph.bfs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class BreadthFirstSearchAlgorithm {
    private static final Logger LOGGER = LoggerFactory.getLogger(BreadthFirstSearchAlgorithm.class);

    public static <T> Optional<Tree<T>> search(T value, Tree<T> root) {
        Queue<Tree<T>> queue = new ArrayDeque<>();
        queue.add(root);

        Tree<T> currentNode;
        while (!queue.isEmpty()) {
            currentNode = queue.remove();
            LOGGER.debug("Visited node with value: {}", currentNode.getValue());

            if (currentNode.getValue().equals(value)) {
                return Optional.of(currentNode);
            } else {
                queue.addAll(currentNode.getChildren());
            }
        }

        return Optional.empty();
    }

    public static <T> Optional<Node<T>> search(T value, Node<T> start) {
        Queue<Node<T>> queue = new ArrayDeque<>();
        queue.add(start);

        Node<T> currentNode;
        Set<Node<T>> alreadyVisited = new HashSet<>();

        while (!queue.isEmpty()) {
            currentNode = queue.remove();
            LOGGER.debug("Visited node with value: {}", currentNode.getValue());

            if (currentNode.getValue().equals(value)) {
                return Optional.of(currentNode);
            } else {
                alreadyVisited.add(currentNode);
                queue.addAll(currentNode.getNeighbors());
                queue.removeAll(alreadyVisited);
            }
        }

        return Optional.empty();
    }

    private Tree<Integer> root;
    private Tree<Integer> rootFirstChild;
    private Tree<Integer> depthMostChild;
    private Tree<Integer> rootSecondChild;

    private Node<Integer> start;
    private Node<Integer> firstNeighbor;
    private Node<Integer> firstNeighborNeighbor;
    private Node<Integer> secondNeighbor;

    public BreadthFirstSearchAlgorithm() {
        start = new Node<>(10);
        firstNeighbor = new Node<>(2);
        start.connect(firstNeighbor);

        firstNeighborNeighbor = new Node<>(3);
        firstNeighbor.connect(firstNeighborNeighbor);
        firstNeighborNeighbor.connect(start);

        secondNeighbor = new Node<>(4);
        start.connect(secondNeighbor);


        root = Tree.of(10);
        rootFirstChild = root.addChild(2);
        depthMostChild = rootFirstChild.addChild(3);
        rootSecondChild = root.addChild(4);

        BreadthFirstSearchAlgorithm.search(10, root);
        BreadthFirstSearchAlgorithm.search(3, firstNeighborNeighbor);
        BreadthFirstSearchAlgorithm.search(4, firstNeighborNeighbor);
        BreadthFirstSearchAlgorithm.search(5, firstNeighborNeighbor);
    }

    public static void main(String[] args) {
        new BreadthFirstSearchAlgorithm();
    }
}

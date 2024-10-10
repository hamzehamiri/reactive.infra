package org.infra.reactive.form.engine.algorithms.graph;

import java.util.Iterator;
import java.util.LinkedList;

public class DFS {
    public static class Graph {
        private int V;
        private LinkedList<Integer>[] adj;

        public Graph(int v) {
            V = v;
            adj = new LinkedList[v];
            for (int i = 0; i < v; ++i)
                adj[i] = new LinkedList();
        }

        void addEdge(int v, int w) {
            adj[v].add(w);
        }
    }

    private static Graph graph;

    static void DFSUtil(int v, boolean visited[]) {
        visited[v] = true;
        System.out.print(v + " ");

        Iterator<Integer> i = graph.adj[v].listIterator();
        while (i.hasNext()) {
            int n = i.next();
            if (!visited[n])
                DFSUtil(n, visited);
        }
    }

    static void DFS(int v) {
        boolean visited[] = new boolean[graph.V];
        DFSUtil(v, visited);
    }

    public static void main(String[] args) {
        graph = new Graph(4);
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 2);
        graph.addEdge(2, 0);
        graph.addEdge(2, 3);
        graph.addEdge(3, 3);

        System.out.println("DFS " + "(starting from vertex 2)");

        DFS(2);
    }
}

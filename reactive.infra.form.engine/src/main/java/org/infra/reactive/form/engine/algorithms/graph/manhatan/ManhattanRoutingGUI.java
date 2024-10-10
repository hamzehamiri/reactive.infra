package org.infra.reactive.form.engine.algorithms.graph.manhatan;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashSet;
import java.util.Set;

public class ManhattanRoutingGUI extends JFrame {

    private Set<Pair<Integer, Integer>> blackCells;

    public ManhattanRoutingGUI() {
        blackCells = new HashSet<>();
        blackCells.add(new Pair<>(2, 2)); // Example: (2, 2) is a black cell

        setTitle("Manhattan Routing");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 400);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());

        JButton calculateButton = new JButton("Calculate Distance");
        JTextField resultField = new JTextField();
        resultField.setEditable(false);

        panel.add(calculateButton, BorderLayout.NORTH);
        panel.add(resultField, BorderLayout.CENTER);

        calculateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int X1 = 1, Y1 = 2;
                int X2 = 3, Y2 = 3;

                if (!isBlackCell(X1, Y1) && !isBlackCell(X2, Y2)) {
                    int distance = manhattanDist(X1, Y1, X2, Y2);
                    resultField.setText("Manhattan distance: " + distance);
                } else {
                    resultField.setText("Invalid points or blocked path.");
                }
            }
        });

        add(panel);
        setVisible(true);
    }

    // Calculate the Manhattan distance between two points
    private int manhattanDist(int X1, int Y1, int X2, int Y2) {
        return Math.abs(X2 - X1) + Math.abs(Y2 - Y1);
    }

    // Check if a cell is a black cell (obstacle)
    private boolean isBlackCell(int X, int Y) {
        return blackCells.contains(new Pair<>(X, Y));
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new ManhattanRoutingGUI());
    }
}

class Pair<T, U> {
    T first;
    U second;

    Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }
}

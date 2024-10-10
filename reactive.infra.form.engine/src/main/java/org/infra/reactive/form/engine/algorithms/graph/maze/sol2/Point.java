package org.infra.reactive.form.engine.algorithms.graph.maze.sol2;

public class Point {
    int pointIdx, rowIdx, ColumnIdx;
    String letter;

    public Point(int pointIdx) {
        this.rowIdx = 0;
        this.ColumnIdx = 0;
        this.letter = "";
        this.pointIdx = pointIdx;
    }

    public int getPointIdx() {
        return pointIdx;
    }

    public void setPointIdx(int pointIdx) {
        this.pointIdx = pointIdx;
    }

    public int getRowIdx() {
        return rowIdx;
    }

    public void setRowIdx(int rowIdx) {
        this.rowIdx = rowIdx;
    }

    public int getColumnIdx() {
        return ColumnIdx;
    }

    public void setColumnIdx(int columnIdx) {
        ColumnIdx = columnIdx;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }
}

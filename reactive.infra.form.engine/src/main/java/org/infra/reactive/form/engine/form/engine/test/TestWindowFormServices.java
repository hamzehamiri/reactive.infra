package org.infra.reactive.form.engine.form.engine.test;

public class TestWindowFormServices {

    public static void main(String[] args) {
        System.out.println("Start Test");
        new StressTestReactiveThreadPool().runThreads(10000);
        System.out.println("End Test");
    }
}

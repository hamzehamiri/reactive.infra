package org.infra.reactive.form.engine.test.driverproblem;


import org.infra.reactive.form.engine.test.RandomGenerator;

import java.util.*;

public class DriverSolutionOne {

    public static void main(String[] args) {
        List<DriverResource> timerTasks = new ArrayList<>();

        Timer timer = new Timer();

        Random random = new Random();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        for (int i = 0; i < 10_000_000; i++) {
            String driverName = RandomGenerator.generateRandomString(10);
            long startTime = new Date().getTime();
            long randomDuration = RandomGenerator.randomWithRandom(random, 18000, 18000);

            DriverResource driverResource = new DriverResource(driverName, startTime, randomDuration);
            timer.schedule(driverResource, startTime, randomDuration);
        }
    }
}

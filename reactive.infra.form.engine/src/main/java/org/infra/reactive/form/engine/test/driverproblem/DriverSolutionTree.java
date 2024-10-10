package org.infra.reactive.form.engine.test.driverproblem;

import org.infra.reactive.form.engine.test.RandomGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;

public class DriverSolutionTree {
    private ConcurrentMap<Long, List<DriverResource>> longListConcurrentMap = new ConcurrentHashMap<>();
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private AtomicLong indexReducer;
    private int roundedNumber = 3;
    private double powerRounded = Math.pow(10, roundedNumber);

    public void addResource(DriverResource driverResource, Long startTime, Long durationTime) {
        long index = startTime + durationTime;
        Long indexRounded = Math.round(index / powerRounded);
        List<DriverResource> clusterData = longListConcurrentMap.computeIfAbsent(indexRounded, aLong -> new ArrayList<>());
        clusterData.add(driverResource);
    }

    public void start() {
        long startTime = getTimeNow();
        long startTimeRounded = Math.round(startTime / powerRounded);
        indexReducer = new AtomicLong(startTimeRounded);
        scheduler.scheduleAtFixedRate(() -> {
            long indexTime = indexReducer.getAndAdd(1L);
            List<DriverResource> listDeriver = longListConcurrentMap.get(indexTime);
            if (listDeriver != null) {
                System.out.println(listDeriver.size());
                longListConcurrentMap.remove(indexTime);
            }
            if (longListConcurrentMap.isEmpty()) {
                scheduler.shutdown();
            }
        }, 0, (long) powerRounded, TimeUnit.MILLISECONDS);
    }

    public long getTimeNow() {
        return 400_000/*new Date().getTime()*/;
    }

    public static void main(String[] args) {
        Random random = new Random();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        DriverSolutionTree driverSolutionTree = new DriverSolutionTree();

        for (int i = 0; i < 10_000_000; i++) {
            String driverName = RandomGenerator.generateRandomString(10);
            long startTime = driverSolutionTree.getTimeNow();
            long randomDuration = RandomGenerator.randomWithRandom(random, 1000, 18000);

            DriverResource driverResource = new DriverResource(driverName, startTime, randomDuration);
            driverSolutionTree.addResource(driverResource, startTime, randomDuration);
        }

        driverSolutionTree.start();
    }
}

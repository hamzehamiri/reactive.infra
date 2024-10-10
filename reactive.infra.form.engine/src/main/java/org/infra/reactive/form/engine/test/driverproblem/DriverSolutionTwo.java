package org.infra.reactive.form.engine.test.driverproblem;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class DriverSolutionTwo {
    private List<DriverResource> resources = new ArrayList<>();
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public void addResource(DriverResource resource) {
        resources.add(resource);
    }

    public void start() {
        scheduler.scheduleAtFixedRate(() -> {
            for (DriverResource resource : resources) {
//                if (resource.isExpired()) {
//                    resource.triggerCallback();
//                    resources.remove(resource);
//                }
            }
        }, 0, 1, TimeUnit.SECONDS);
    }

    public void stop() {
        scheduler.shutdown();
    }

    public static void main(String[] args) {
        DriverSolutionTwo scheduler = new DriverSolutionTwo();
        scheduler.start();

        Runtime.getRuntime().addShutdownHook(new Thread(scheduler::stop));
    }
}

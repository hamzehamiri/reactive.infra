package org.infra.reactive.form.engine.test.driverproblem;

import java.util.TimerTask;

public class DriverResource extends TimerTask {
    private String name;
    private Long startTime;
    private Long duration;

    public DriverResource(String name, Long startTime, Long duration) {
        this.name = name;
        this.startTime = startTime;
        this.duration = duration;
    }

    @Override
    public void run() {
        System.out.println("Time expired" + name + " Duration " + duration);
    }
}

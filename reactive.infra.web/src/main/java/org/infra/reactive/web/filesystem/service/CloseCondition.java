package org.infra.reactive.web.filesystem.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

public class CloseCondition {
    Logger LOGGER = LoggerFactory.getLogger(CloseCondition.class);

    AtomicInteger tasksSubmitted = new AtomicInteger(0);
    AtomicInteger tasksCompleted = new AtomicInteger(0);
    AtomicBoolean allTaskssubmitted = new AtomicBoolean(false);

    public boolean canCloseOnComplete() {
        allTaskssubmitted.set(true);
        return tasksCompleted.get() == tasksSubmitted.get();
    }

    public void onTaskSubmitted() {
        tasksSubmitted.incrementAndGet();
    }

    public boolean onTaskCompleted() {
        boolean allSubmittedClosed = tasksSubmitted.get() == tasksCompleted.incrementAndGet();
        return allSubmittedClosed && allTaskssubmitted.get();
    }
}

package org.infra.reactive.form.engine.logger.loggerqueue.consumer;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.logger.loggerqueue.LoggerMessageModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class LoggerQueueManagerConsumerThread extends Thread {
    @Getter
    @Setter
    protected Queue<LoggerMessageModel> queueLogMessageModel;
    @Getter
    @Setter
    protected boolean isLive = true;
    private List<LoggerQueueManagerConsumerAbstract> loggerQueueManagerConsumerAbstracts;

    public LoggerQueueManagerConsumerThread() {
        loggerQueueManagerConsumerAbstracts = new ArrayList<>();
    }

    public void addConsumer(LoggerQueueManagerConsumerAbstract loggerQueueManagerConsumerAbstract) {
        loggerQueueManagerConsumerAbstracts.add(loggerQueueManagerConsumerAbstract);
    }

    @Override
    public void run() {
        while (isLive) {
            LoggerMessageModel messageEmmit = queueLogMessageModel.poll();
            for (LoggerQueueManagerConsumerAbstract loggerQueueManagerConsumerAbstract : loggerQueueManagerConsumerAbstracts) {
                loggerQueueManagerConsumerAbstract.consume(messageEmmit);
            }
        }
    }

    public void stopConsumers() {
        isLive = false;
        for (LoggerQueueManagerConsumerAbstract loggerQueueManagerConsumerAbstract : loggerQueueManagerConsumerAbstracts) {
            loggerQueueManagerConsumerAbstract.stopConsumer();
        }
    }
}

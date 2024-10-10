package org.infra.reactive.form.engine.logger.loggerqueue.consumer;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.logger.loggerqueue.LoggerMessageModel;

import java.util.Properties;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public abstract class LoggerQueueManagerConsumerAbstract {
    public static final String keyBasePathLog = "KeyBasePathLog";


    protected Lock lock = new ReentrantLock(true);
    @Getter
    @Setter
    protected Properties properties;

    public LoggerQueueManagerConsumerAbstract() {
    }

    public abstract void initial(Properties Properties);

    public abstract void consume(LoggerMessageModel loggerMessageModel);

    public abstract void stopConsumer();
}

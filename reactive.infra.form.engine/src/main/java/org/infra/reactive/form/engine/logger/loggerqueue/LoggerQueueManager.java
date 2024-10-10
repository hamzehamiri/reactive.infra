package org.infra.reactive.form.engine.logger.loggerqueue;


import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.logger.loggerqueue.consumer.LoggerQueueManagerConsumerAbstract;
import org.infra.reactive.form.engine.logger.loggerqueue.consumer.LoggerQueueManagerConsumerFile;
import org.infra.reactive.form.engine.logger.loggerqueue.consumer.LoggerQueueManagerConsumerThread;

import java.time.LocalDateTime;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class LoggerQueueManager {
    private static LoggerQueueManager Instance;

    private BlockingQueue<LoggerMessageModel> queueLogMessageModel;
    private LoggerQueueManagerConsumerThread loggerQueueManagerConsumerThread;

    public static LoggerQueueManager Singleton() {
        if (Instance == null)
            Instance = new LoggerQueueManager();
        return Instance;
    }

    private LoggerQueueManager() {
        queueLogMessageModel = new ArrayBlockingQueue<>(4000);
        loggerQueueManagerConsumerThread = new LoggerQueueManagerConsumerThread();
    }

    public void addConsumer(LoggerQueueManagerConsumerAbstract loggerQueueManagerConsumerAbstractThread) {
        loggerQueueManagerConsumerThread.addConsumer(loggerQueueManagerConsumerAbstractThread);
    }

    public void addLog(CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO, String moduleName, String message) {
        queueLogMessageModel.add(new LoggerMessageModel(coreUserAuthenticateRequestDTO, LocalDateTime.now(), moduleName, message));
    }

    public void startLoggers() {
        if (!loggerQueueManagerConsumerThread.isLive()) {
            loggerQueueManagerConsumerThread.start();
        }
    }

    public void stopLoggers() {
        loggerQueueManagerConsumerThread.stopConsumers();
    }

    public static void setupDefaultLogger() {
        LoggerQueueManagerConsumerFile fileConsumer = new LoggerQueueManagerConsumerFile();
        LoggerQueueManager logger = LoggerQueueManager.Singleton();
        logger.addConsumer(fileConsumer);
        logger.startLoggers();
    }

}

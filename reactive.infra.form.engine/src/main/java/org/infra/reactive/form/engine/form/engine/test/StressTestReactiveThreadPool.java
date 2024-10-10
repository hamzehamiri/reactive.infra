package org.infra.reactive.form.engine.form.engine.test;

import java.util.concurrent.CountDownLatch;

public class StressTestReactiveThreadPool {

    private CountDownLatch signals;

    public void runThreads(int countStress) {
        signals = new CountDownLatch(countStress);
        for (int index = 0; index < countStress; index++) {
            StressTestReactiveThread thread = new StressTestReactiveThread();
            thread.start();
            try {
                thread.join();
                signals.countDown();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        try {
            signals.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

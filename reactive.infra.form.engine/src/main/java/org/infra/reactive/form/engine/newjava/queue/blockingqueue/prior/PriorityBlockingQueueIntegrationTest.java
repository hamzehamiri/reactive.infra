package org.infra.reactive.form.engine.newjava.queue.blockingqueue.prior;

import java.util.ArrayList;
import java.util.concurrent.PriorityBlockingQueue;

public class PriorityBlockingQueueIntegrationTest {
    public void givenUnorderedValues_whenPolling_thenShouldOrderQueue() throws InterruptedException {
        PriorityBlockingQueue<Integer> queue = new PriorityBlockingQueue<>();
        ArrayList<Integer> polledElements = new ArrayList<>();

        queue.add(1);
        queue.add(5);
        queue.add(2);
        queue.add(3);
        queue.add(4);

        queue.drainTo(polledElements);

        //assertThat(polledElements).containsExactly(1, 2, 3, 4, 5);
    }
}

package org.infra.reactive.form.engine.newjava.concurrentskiplistmap;

import org.jetbrains.annotations.NotNull;

import java.time.ZonedDateTime;
import java.util.UUID;
import java.util.concurrent.ConcurrentNavigableMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

public class ConcurrentSkipListSetIntegrationTest {
    @NotNull
    private static MyService getMyService() {
        int numberOfThreads = 2;
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        EventWindowSort eventWindowSort = new EventWindowSort();
        //when
        Runnable producer = () -> IntStream
                .rangeClosed(0, 100)
                .forEach(index -> eventWindowSort.acceptEvent(new Event(ZonedDateTime
                        .now()
                        .minusSeconds(index), UUID
                        .randomUUID()
                        .toString())));

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.execute(producer);
        }
        MyService result = new MyService(executorService, eventWindowSort);
        return result;
    }

    private record MyService(ExecutorService executorService, EventWindowSort eventWindowSort) {
    }

    public void givenThreadsProducingEvents_whenGetForEventsFromLastMinute_thenReturnThoseEventsInTheLockFreeWay() throws InterruptedException {
        //given
        MyService result = getMyService();

        Thread.sleep(500);

        ConcurrentNavigableMap<ZonedDateTime, String> eventsFromLastMinute = result.eventWindowSort().getEventsFromLastMinute();

        long eventsOlderThanOneMinute = eventsFromLastMinute
                .entrySet()
                .stream()
                .filter(e -> e
                        .getKey()
                        .isBefore(ZonedDateTime
                                .now()
                                .minusMinutes(1)))
                .count();

        if (eventsOlderThanOneMinute == 0) {

        }

        long eventYoungerThanOneMinute = eventsFromLastMinute
                .entrySet()
                .stream()
                .filter(e -> e
                        .getKey()
                        .isAfter(ZonedDateTime
                                .now()
                                .minusMinutes(1)))
                .count();

        //then
        if (eventYoungerThanOneMinute > 0) {

        }

        result.executorService().awaitTermination(1, TimeUnit.SECONDS);
        result.executorService().shutdown();
    }

    public void givenThreadsProducingEvents_whenGetForEventsOlderThanOneMinute_thenReturnThoseEventsInTheLockFreeWay() throws InterruptedException {
        //given
        MyService result = getMyService();

        Thread.sleep(500);

        ConcurrentNavigableMap<ZonedDateTime, String> eventsFromLastMinute = result.eventWindowSort().getEventsOlderThatOneMinute();

        long eventsOlderThanOneMinute = eventsFromLastMinute
                .entrySet()
                .stream()
                .filter(e -> e
                        .getKey()
                        .isBefore(ZonedDateTime
                                .now()
                                .minusMinutes(1)))
                .count();

        if (eventsOlderThanOneMinute > 0) {

        }

        long eventYoungerThanOneMinute = eventsFromLastMinute
                .entrySet()
                .stream()
                .filter(e -> e
                        .getKey()
                        .isAfter(ZonedDateTime
                                .now()
                                .minusMinutes(1)))
                .count();

        //then
        if (eventYoungerThanOneMinute == 0) {

        }

        result.executorService().awaitTermination(1, TimeUnit.SECONDS);
        result.executorService().shutdown();
    }

    public static void main(String[] args) {
        try {
            new ConcurrentSkipListSetIntegrationTest().givenThreadsProducingEvents_whenGetForEventsFromLastMinute_thenReturnThoseEventsInTheLockFreeWay();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

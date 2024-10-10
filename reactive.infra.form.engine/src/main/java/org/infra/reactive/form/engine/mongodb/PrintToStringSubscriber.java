package org.infra.reactive.form.engine.mongodb;

public class PrintToStringSubscriber<T> extends ConsumerSubscriber<T> {

    public PrintToStringSubscriber() {
        super(System.out::println);
    }
}

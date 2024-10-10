package org.infra.reactive.form.engine.mongodb;

import java.util.function.Consumer;

public class ConsumerSubscriber<T> extends OperationSubscriber<T> {
    private final Consumer<T> consumer;

    public ConsumerSubscriber(final Consumer<T> consumer) {
        this.consumer = consumer;
    }


    @Override
    public void onNext(final T document) {
        super.onNext(document);
        consumer.accept(document);
    }
}

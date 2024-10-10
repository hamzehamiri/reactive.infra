package org.infra.reactive.form.engine.mongodb;

public class PrintSubscriber<T> extends OperationSubscriber<T> {
    private final String message;

    public PrintSubscriber(final String message) {
        this.message = message;
    }

    @Override
    public void onComplete() {
        System.out.printf((message) + "%n", getReceived());
        super.onComplete();
    }
}
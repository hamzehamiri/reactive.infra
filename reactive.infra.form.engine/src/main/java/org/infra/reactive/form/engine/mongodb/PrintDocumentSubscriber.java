package org.infra.reactive.form.engine.mongodb;

import org.bson.Document;

public class PrintDocumentSubscriber extends ConsumerSubscriber<Document> {

    public PrintDocumentSubscriber() {
        super(t -> System.out.println(t.toJson()));
    }
}

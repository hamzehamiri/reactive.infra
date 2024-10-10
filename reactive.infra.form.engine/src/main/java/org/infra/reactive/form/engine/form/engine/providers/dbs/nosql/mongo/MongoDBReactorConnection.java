package org.infra.reactive.form.engine.form.engine.providers.dbs.nosql.mongo;

import com.mongodb.reactivestreams.client.MongoClient;
import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorConnection;

public class MongoDBReactorConnection extends AbstractNoSQLReactorConnection {
    @Setter
    @Getter
    private MongoClient mongoClient;

}

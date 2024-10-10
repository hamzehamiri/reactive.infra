package org.infra.reactive.form.engine.form.engine.providers.dbs.nosql.mongo;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorConnectionFactory;

import java.util.Arrays;


public class MongoDBReactorConnectionFactory extends AbstractNoSQLReactorConnectionFactory<MongoDBReactorConnection> {
    @Setter
    private MongoClientSettings mongoClientSettings;
    private MongoClient mongoClient;
    private MongoDBReactorConnection mongoDBReactorConnection;

    @Override
    public void buildConnectionFactory() {
        this.mongoClientSettings = MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                        builder.hosts(Arrays.asList(
                                new ServerAddress("localhost", 27017),
                                new ServerAddress("localhost", 27027),
                                new ServerAddress("localhost", 27037))))
                .build();
        this.mongoClient = MongoClients.create(this.mongoClientSettings);
        this.mongoDBReactorConnection = new MongoDBReactorConnection();
        this.mongoDBReactorConnection.setMongoClient(this.mongoClient);
    }

    @Override
    public MongoDBReactorConnection getConnection() {
        return this.mongoDBReactorConnection;
    }
}

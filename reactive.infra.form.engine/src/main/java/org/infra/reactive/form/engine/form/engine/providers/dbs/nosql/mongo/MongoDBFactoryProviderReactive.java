package org.infra.reactive.form.engine.form.engine.providers.dbs.nosql.mongo;

import com.mongodb.client.result.InsertManyResult;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import org.bson.BsonDocument;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.AbstractReactorFactoryRegister;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.DBTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorFactory;
import org.infra.reactive.form.engine.mongodb.PrintToStringSubscriber;

import java.util.ArrayList;
import java.util.List;

@AbstractReactorFactoryRegister(registerKey = "mongo", DB_TYPE_ENUM = DBTypeEnum.NoSQL)
public class MongoDBFactoryProviderReactive extends AbstractNoSQLReactorFactory<MongoDBReactorConnectionFactory, MongoDBQueryProvider> {

    public MongoDBFactoryProviderReactive() {

    }

    @Override
    public void buildConnectionFactory() {
        this.connectionfactory = new MongoDBReactorConnectionFactory();
        this.connectionfactory.setCoreTableDataSourceDTO(this.coreTableDataSourceDTO);
        this.connectionfactory.buildConnectionFactory();
    }

    @Override
    public void buildConnectionPool() {

    }

    @Override
    public MongoDBQueryProvider createQueryProvider() {
        return null;
    }

    public static void main(String[] args) {
        MongoDBFactoryProviderReactive mongoDBFactoryProviderReactive = new MongoDBFactoryProviderReactive();
        mongoDBFactoryProviderReactive.buildConnectionFactory();
        mongoDBFactoryProviderReactive.buildConnectionPool();
        mongoDBFactoryProviderReactive.createQueryProvider();
//        PrintToStringSubscriber<String> print = new PrintToStringSubscriber<>();

//        PrintToStringSubscriber<Void> voidConsumer = new PrintToStringSubscriber<>();
        MongoDatabase databaseAttachment = mongoDBFactoryProviderReactive.getConnectionfactory().getConnection().getMongoClient().getDatabase("attachment");
//        databaseAttachment.createCollection("Test").subscribe(voidConsumer);
//        voidConsumer.await();

        PrintToStringSubscriber<InsertManyResult> voidConsumer = new PrintToStringSubscriber<>();


        MongoCollection<BsonDocument> collectionMongoDB = databaseAttachment.getCollection("Test", BsonDocument.class);
//        collectionMongoDB.insertOne(document).subscribe(voidConsumer);

        List<BsonDocument> bsonDocuments = new ArrayList<>(1000);
        for (int i = 0; i < 1000; i++) {
            BsonDocument document = BsonDocument.parse("{x: 1}");
            bsonDocuments.add(document);
        }

        collectionMongoDB.insertMany(bsonDocuments).subscribe(voidConsumer);

        voidConsumer.await();
    }
}

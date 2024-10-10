package org.infra.reactive.form.engine.mongodb;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.gridfs.model.GridFSDownloadOptions;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSBuckets;
import org.bson.BsonDocument;
import org.bson.BsonInt64;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;

import java.nio.Buffer;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

import static com.mongodb.client.model.Filters.eq;
import static java.util.Arrays.asList;

public class MongoDBReactiveCheck {

    private static MongoClient createConnection() {
        ConnectionString connString = new ConnectionString("mongodb://localhost:27017");
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connString)
                .serverApi(serverApi)
                .build();
        return MongoClients.create(settings);
    }

    public static void main(String[] args) {
        gridFSUpload();
    }

    private static void test1() {
        MongoDatabase database = createConnection().getDatabase("admin");
        Bson command = new BsonDocument("ping", new BsonInt64(1));
//        Publisher<Document> commandResult = database.runCommand(command);
        var subscriber = new PrintToStringSubscriber<String>();
        database.listCollectionNames().subscribe(subscriber);
        subscriber.await();
        var subscriber2 = new PrintToStringSubscriber<Document>();
        createConnection().listDatabases().subscribe(subscriber2);
        subscriber2.await();
    }

    public static void gridFSUpload() {
        MongoDatabase database = createConnection().getDatabase("mydb");
        ObservableSubscriber<Void> dropSubscriber = new OperationSubscriber<>();
        database.drop().subscribe(dropSubscriber);
        dropSubscriber.await();

        GridFSBucket gridFSBucket = GridFSBuckets.create(database);

        /*
         * UploadFromPublisher Example
         */
        // Get the input publisher
        Publisher<ByteBuffer> publisherToUploadFrom = toPublisher(ByteBuffer.wrap("MongoDB Tutorial..".getBytes(StandardCharsets.UTF_8)));

        // Create some custom options
        GridFSUploadOptions options = new GridFSUploadOptions()
                .chunkSizeBytes(1024)
                .metadata(new Document("type", "presentation"));

        ObservableSubscriber<ObjectId> uploadSubscriber = new OperationSubscriber<>();
        gridFSBucket.uploadFromPublisher("mongodb-tutorial", publisherToUploadFrom, options).subscribe(uploadSubscriber);
        ObjectId fileId = uploadSubscriber.get().get(0);


        /*
         * Find documents
         */
        System.out.println("File names:");
        ConsumerSubscriber<GridFSFile> filesSubscriber = new ConsumerSubscriber<>(gridFSFile ->
                System.out.println(" - " + gridFSFile.getFilename()));
        gridFSBucket.find().subscribe(filesSubscriber);
        filesSubscriber.await();

        /*
         * Find documents with a filter
         */
        filesSubscriber = new ConsumerSubscriber<>(gridFSFile -> System.out.println("Found: " + gridFSFile.getFilename()));
        gridFSBucket.find(eq("metadata.contentType", "image/png")).subscribe(filesSubscriber);
        filesSubscriber.await();

        /*
         * DownloadToPublisher
         */
        ObservableSubscriber<ByteBuffer> downloadSubscriber = new OperationSubscriber<>();
        gridFSBucket.downloadToPublisher(fileId).subscribe(downloadSubscriber);
        Integer size = downloadSubscriber.get().stream().map(Buffer::limit).reduce(0, Integer::sum);
        System.out.println("downloaded file sized: " + size);


        /*
         * DownloadToStreamByName
         */
        GridFSDownloadOptions downloadOptions = new GridFSDownloadOptions().revision(0);
        downloadSubscriber = new OperationSubscriber<>();
        gridFSBucket.downloadToPublisher("mongodb-tutorial", downloadOptions).subscribe(downloadSubscriber);
        size = downloadSubscriber.get().stream().map(Buffer::limit).reduce(0, Integer::sum);
        System.out.println("downloaded file sized: " + size);


        /*
         * Rename
         */
//        OperationSubscriber<Void> successSubscriber = new OperationSubscriber<>();
//        gridFSBucket.rename(fileId, "mongodbTutorial").subscribe(successSubscriber);
//        successSubscriber.await();
//        System.out.println("Renamed file");
//
//
//        /*
//         * Delete
//         */
//        successSubscriber = new OperationSubscriber<>();
//        gridFSBucket.delete(fileId).subscribe(successSubscriber);
//        successSubscriber.await();
//        System.out.println("Deleted file");
//
//        // Final cleanup
//        successSubscriber = new OperationSubscriber<>();
//        database.drop().subscribe(successSubscriber);
//        successSubscriber.await();
//        System.out.println("Finished");
    }

    public static Publisher<ByteBuffer> toPublisher(final ByteBuffer... byteBuffers) {
        return Flux.fromIterable(asList(byteBuffers));
    }
}

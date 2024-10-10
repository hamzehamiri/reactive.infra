package org.infra.reactive.form.engine.form.engine.test;

import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Result;
import io.r2dbc.spi.Statement;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.postgres.PostgresQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.setup.TestData;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.concurrent.CountDownLatch;
import java.util.function.Consumer;
import java.util.function.Function;

public class StressTestReactiveThread extends Thread {

    private AbstractRDBMSReactorFactory<?,?> abstractRDBMSReactorFactory;
    private PostgresQueryProvider postgresQueryProvider;
    private CountDownLatch countDownLatch;

    public StressTestReactiveThread() {
        this.countDownLatch = new CountDownLatch(1);
        this.abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        this.postgresQueryProvider = new PostgresQueryProvider(null, new RDBMSAliasProvider());
        this.postgresQueryProvider.setTableExpressionPrepare(TestData.sample1());
    }

    @Override
    public void run() {
        this.postgresQueryProvider.generateQueryWithParam();
        QuerySelectModelWithParamModel params = this.postgresQueryProvider.getQuerySelectModelWithParamModel();
        Mono<Connection> connectionCreated = this.abstractRDBMSReactorFactory.getRConnection();

//        Flux.from(connectionCreated).flatMap(connection -> {
//            Statement result = connection.createStatement(params.getQuery());
//            params.getParamValue().forEach(result::bind);
//            return result.execute();
//        }).flatMap(result -> {
//            return result.map((row, rowMetadata) -> {
//                HashMap<String, Object> rowData = new HashMap<>();
//                rowMetadata.getColumnMetadatas().forEach(columnMetadata -> {
//                    rowData.put(columnMetadata.getName(), row.get(columnMetadata.getName()));
//                });
////                Stream<Object> rowData = rowMetadata.getColumnMetadatas().stream().map(columnMetadata -> {
////                    return row.get(columnMetadata.getName());
////                });
//                return rowData;
//            });
//        }).doOnComplete(() -> {
//            countDownLatch.countDown();
//        }).doOnError(throwable -> {
//            throwable.printStackTrace();
//        }).subscribe(o -> {
//            o.forEach((s, o1) -> {
//                System.out.println(s + " ====> " + o1);
//            });
////            o.forEach(s -> {
////                System.out.println(s);
////            });
//        });

        Function<HashMap<String, Object>, HashMap<String, Object>> func = (HashMap<String, Object> o) -> {
            System.out.println(o);
            return o;
        };

        Function<Result, Publisher<HashMap<String, Object>>> funcFlatMap = (Result result) -> {
            return result.map((row, rowMetadata) -> {
                HashMap<String, Object> rowData = new HashMap<>();
                rowMetadata.getColumnMetadatas().forEach(columnMetadata -> {
                    rowData.put(columnMetadata.getName(), row.get(columnMetadata.getName()));
                });
                return rowData;
            });
        };

        Function<Connection, Publisher<? extends Result>> connectionProvider = (Connection connection) -> {
            String query = params.getRdbmsQueryStringBuilder().getFullQuery().toString();
            Statement statement = connection.createStatement(query);
            params.getParamValue().forEach(statement::bind);
            return statement.execute();
        };

        Function<Connection, Publisher<Void>> connectionClose = (Connection connection) -> {
            countDownLatch.countDown();
            return connection.close();
        };

        Consumer<HashMap<String, Object>> subscriber = (HashMap<String, Object> o) -> {
            System.out.println(o);
        };


        Flux.usingWhen(connectionCreated, connectionProvider, connectionClose)
                .flatMap(funcFlatMap)
                .map(func)
                .subscribe(subscriber);
        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

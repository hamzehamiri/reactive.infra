package org.infra.reactive.form.engine.form.engine.setup;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QueryInsertWithParamModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.concurrent.CountDownLatch;

public class RoleSetup {

    private AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory;
    private CountDownLatch countDownLatch;

    public RoleSetup() {
        this.abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        this.countDownLatch = new CountDownLatch(1);
    }

    public void startSetup() {

    }

    public void startSetup2() {
        CoreRoleEntity coreRoleMetaData_admin = new CoreRoleEntity();
        coreRoleMetaData_admin.setName("Admin");

        CoreRoleEntity coreRoleMetaData_StockManager = new CoreRoleEntity();
        coreRoleMetaData_StockManager.setName("StockManager");

        AbstractRDBMSQueryProvider abstractRDBMSQueryProvider = abstractRDBMSReactorFactory.createQueryProvider();
        abstractRDBMSQueryProvider.setModelQueryGenerator(AbstractRDBMSQueryProvider.ModelQueryGenerator.Insert);

        QueryInsertWithParamModel insertQuery = abstractRDBMSQueryProvider.insertOrUpdateQueryWithParam(coreRoleMetaData_admin);
        FlowExecuteConnection flowExecuteConnection = new FlowExecuteConnection(insertQuery);

        Mono<Connection> monoConnection = abstractRDBMSReactorFactory.getRConnection();

        Flux<Long> rd = Flux.usingWhen(monoConnection, flowExecuteConnection.mapperConnection(), Connection::close).flatMap(flowExecuteConnection.mapperRecord());
        rd.subscribe(aLong -> {
            System.out.println(aLong);
        });
//        Flux<Long> dd = monoConnection
//                .flatMapMany(flowExecuteConnection.mapperConnection())
//                .concatWith(s -> {
//                    return Mono.from(connection.close());
//                })
//                .flatMap(flowExecuteConnection.mapperRecord());

//        Flux.from(monoConnection)
//                .flatMap(connection -> {
//                    Statement statement = connection.createStatement(insertQuery.getQuery()).returnGeneratedValues("id");
//                    insertQuery.getParamValue().forEach((index, Value) -> {
//                        statement.bind(index - 1, Value);
//                    });
//                    Flux<Long> alongData = Flux.from(statement.execute())
//                            .flatMap(result -> {
//                                return result.map((row, rowMetadata) -> {
//                                    return row.get("id", Long.class);
//                                });
//                            }).thenMany(subscriber -> {
//                                connection.close();
//                            });
//                    return alongData;
//                }).subscribe(aLong -> {
//                    countDownLatch.countDown();
//                    System.out.println(aLong);
//                });


//        Mono.from(monoConnection)
//                .flatMapMany(flowExecuteConnection.mapperConnection())
//                .flatMap(flowExecuteConnection.mapperRecord())
//                .map(aLong -> {
//                    return aLong;
//                }).doOnNext(aLong -> {
//                    System.out.println(aLong);
//                })
//                .thenMany(subscriber -> {
//                    countDownLatch.countDown();
//                }).subscribe(o -> {
//                    System.out.println("Test");
//                });

//        Mono.from(monoConnection)
//                .flatMapMany(connection -> {
//                    Statement statement = connection.createStatement(insertQuery.getQuery()).returnGeneratedValues("id");
//                    insertQuery.getParamValue().forEach((index, Value) -> {
//                        statement.bind(index - 1, Value);
//                    });
//                    Flux<Long> dd = Flux.from(statement.execute())
//                            .flatMap(result -> {
//                                return result.map((row, rowMetadata) -> {
//                                    return row.get("id", Long.class);
//                                });
//                            }).thenMany(subscriber -> {
//                                connection.close();
//                            });
//                    return dd;
//                }).thenMany(subscriber -> {
//                    countDownLatch.countDown();
//                }).subscribe(o -> {
//                    System.out.println("Test");
//                });

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        RoleSetup roleSetup = new RoleSetup();
        roleSetup.startSetup();
    }


}

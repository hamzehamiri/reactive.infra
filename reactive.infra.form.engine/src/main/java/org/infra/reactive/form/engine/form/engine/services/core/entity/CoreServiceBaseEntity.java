package org.infra.reactive.form.engine.form.engine.services.core.entity;

import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Result;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.Statement;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.SignalType;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Consumer;
import java.util.function.Function;

public abstract class CoreServiceBaseEntity {

    public static final String complete = "Complete";
    private static final Logger logger = LogManager.getLogger(CoreServiceBaseEntity.class);

    protected AtomicBoolean isCacheFilled = new AtomicBoolean(false);
//    protected Lock lock = new ReactiveLock();
//    protected ReentrantLock reentrantLock = new ReentrantLock(true);

    public static <T> T convertStatic(Class<T> entity, Row row, Map<String, String> params, TableMetadata tableMetadata) {
        try {
            Constructor<T> dtoInstance = entity.getConstructor();

            T instanceDTO = dtoInstance.newInstance();

            for (Map.Entry<String, ColumnMetaModel> uuidColumnMetaModelEntry : tableMetadata.getColumnsByUUID().entrySet()) {
                String uuid = uuidColumnMetaModelEntry.getKey();
                ColumnMetaModel columnMetaModel = uuidColumnMetaModelEntry.getValue();

                String aliesColumnName = params.get(uuid);
                String propsName = columnMetaModel.getColumnName();
                Object valueProps = row.get(aliesColumnName);
                try {
                    Field fieldProps = entity.getDeclaredField(propsName);
                    fieldProps.setAccessible(true);
                    if (fieldProps.getType().equals(Optional.class)) {
                        fieldProps.set(instanceDTO, Optional.ofNullable(valueProps));
                    } else {
                        fieldProps.set(instanceDTO, valueProps);
                    }
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }

            return instanceDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public <T> T convert(Class<T> entity, Row row, Map<String, String> params, TableMetadata coreTranslate) {
        return CoreServiceBaseEntity.convertStatic(entity, row, params, coreTranslate);
    }

    public Flux<? extends Serializable> cacheAll(Mono<Connection> connection) {
        if (!isCacheFilled.get()) {
//            lock.tryLock();
//            reentrantLock.lock();
            if (!isCacheFilled.get()) {
                return checkCache(connection);
            } else {
                return Flux.just(complete);
            }
        } else {
            return Flux.just(complete);
        }
    }

    public Consumer<SignalType> doFinallyCache() {
        return signalType -> {
            switch (signalType) {
                case CANCEL, ON_COMPLETE -> {
                    isCacheFilled.set(true);
//                    reentrantLock.unlock();
//                    lock.unlock();
                }
            }
        };
    }

    public Consumer<? super Throwable> doException() {
        return throwable -> {
            throwable.printStackTrace();
        };
    }

    public Flux<? extends Serializable> cacheReset(Mono<Connection> connection) {
        isCacheFilled.set(false);
        return cacheAll(connection);
    }

    public Mono<Connection> getConnection(AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory, Mono<Connection> connection) {
        return getConnectionStatic(abstractRDBMSReactorFactory, connection);
    }

    public static Mono<Connection> getConnectionStatic(AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory, Mono<Connection> connection) {
        return connection != null ? connection : abstractRDBMSReactorFactory.getRConnection();
    }

    public QuerySelectModelWithParamModel convertParam(AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory, TableExpressionPrepare tableExpressionPrepare) {
        return convertParamStatic(abstractRDBMSReactorFactory, tableExpressionPrepare);
    }

    public static QuerySelectModelWithParamModel convertParamStatic(AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory, TableExpressionPrepare tableExpressionPrepare) {
        AbstractRDBMSQueryProvider abstractRDBMSQueryProvider = abstractRDBMSReactorFactory.createQueryProvider(tableExpressionPrepare);
        abstractRDBMSQueryProvider.generateQueryWithParam();
        return abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();
    }

    public Function<Connection, Mono<? extends Result>> connectionConsumer(QuerySelectModelWithParamModel params) {
        return connectionConsumerStatic(params);
    }

    public static Function<Connection, Mono<? extends Result>> connectionConsumerStatic(QuerySelectModelWithParamModel params) {
        return (Connection connection) -> {
            String query = params.getRdbmsQueryStringBuilder().getFullQuery().toString();
            logger.info(query);
            Statement statement = connection.createStatement(query);
            params.getParamValue().forEach((paramIndex, paramValue) -> {
                statement.bind(paramIndex - 1, paramValue);
            });
            return Mono.from(statement.execute());
        };
    }

    public static Function<Connection, Mono<? extends Result>> connectionConsumerStatic(String query) {
        return (Connection connection) -> {
            Statement statement = connection.createStatement(query);
            return Mono.from(statement.execute());
        };
    }

    public <T extends BaseEntityInterface<?>> Flux<T> createDataTable(Mono<Connection> connection, Long selectId, Class<T> clazzEntity, Consumer<T> consumerEntity) {
        CoreTableDefinition coreTableDefinition = clazzEntity.getAnnotation(CoreTableDefinition.class);
        System.out.println(coreTableDefinition.tableName());

        TableMetadata coreTable = CoreServiceEntityTable.findByTableName(coreTableDefinition.tableName());
        TableExpression selectCoreTable = new TableExpression()
                .setId(selectId)
                .SetMasterTable(coreTable.getID(), coreTable)
                .AddTableMetadataForAllColumnSelected(coreTable);
        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(selectCoreTable);
        tableExpressionPrepare.generateManualWithOutMechanism(connection);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        QuerySelectModelWithParamModel param = convertParam(abstractRDBMSReactorFactory, tableExpressionPrepare);

        return Flux.usingWhen(getConnection(abstractRDBMSReactorFactory, connection), connectionConsumer(param), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
            T rowEntity = convert(clazzEntity, row, param.getMapColumnAlias(), coreTable);
            consumerEntity.accept(rowEntity);
            return rowEntity;
        }));
    }

    public static <T extends BaseEntityInterface<?>> String findTableName(Class<T> clazzEntity) {
        CoreTableDefinition coreTableDefinition = clazzEntity.getAnnotation(CoreTableDefinition.class);
        return coreTableDefinition.tableName();
    }

    public abstract Flux<? extends Serializable> checkCache(Mono<Connection> connection);
}

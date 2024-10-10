package org.infra.reactive.form.engine.form.engine.services.core.entity;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.cache.lru.LRUCache;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.table.column.CoreTableColumnEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.CoreTableEntity;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.setup.CoreTables;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class CoreServiceEntityTableBase extends CoreServiceBaseEntity {

    public static LRUCache<Long, CoreTableEntity> coreTableEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<String, CoreTableEntity> coreTableEntityByTableNameLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnEntity> coreTableColumnEntityLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreTableColumnEntity>> coreTableColumnByTableIdEntityLRUCache = new LRUCache<>(1000);

    @Override
    public Flux<? extends Serializable> checkCache(Mono<Connection> connection) {
        return Flux.merge(
                coreTable(connection),
                coreTableColumn(connection)
        ).doFinally(doFinallyCache()).doOnError(doException());
    }

    @Override
    public Flux<? extends Serializable> cacheReset(Mono<Connection> connection) {
        coreTableEntityLRUCache.clear();
        coreTableEntityByTableNameLRUCache.clear();
        coreTableColumnEntityLRUCache.clear();
        coreTableColumnByTableIdEntityLRUCache.clear();
        return super.cacheReset(connection);
    }

    public Flux<CoreTableEntity> coreTable(Mono<Connection> connection) {
        TableMetadata coreTable = CoreTables.coreTable();
        TableExpression tableExpression = new TableExpression()
                .setId(1L)
                .SetMasterTable(coreTable.getID(), coreTable)
                .AddTableMetadataForAllColumnSelected(coreTable);

        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(tableExpression);
        tableExpressionPrepare.generateManualWithOutMechanism(connection);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        QuerySelectModelWithParamModel param = convertParam(abstractRDBMSReactorFactory, tableExpressionPrepare);

        return Flux.usingWhen(getConnection(abstractRDBMSReactorFactory, connection), connectionConsumer(param), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
            CoreTableEntity rowEntity = convert(CoreTableEntity.class, row, param.getMapColumnAlias(), coreTable);
            coreTableEntityLRUCache.put(rowEntity.getId(), rowEntity);
            coreTableEntityByTableNameLRUCache.put(rowEntity.getTablename(), rowEntity);
            return rowEntity;
        }));
    }

    public Flux<CoreTableColumnEntity> coreTableColumn(Mono<Connection> connection) {
        TableMetadata coreTableColumn = CoreTables.coreTableColumn();
        TableExpression selectCoreTableColumn = new TableExpression()
                .setId(2L)
                .SetMasterTable(coreTableColumn.getID(), coreTableColumn)
                .AddTableMetadataForAllColumnSelected(coreTableColumn);

        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(selectCoreTableColumn);
        tableExpressionPrepare.generateManualWithOutMechanism(connection);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        QuerySelectModelWithParamModel param = convertParam(abstractRDBMSReactorFactory, tableExpressionPrepare);

        return Flux.usingWhen(getConnection(abstractRDBMSReactorFactory, connection), connectionConsumer(param), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
            CoreTableColumnEntity rowEntity = convert(CoreTableColumnEntity.class, row, param.getMapColumnAlias(), coreTableColumn);
            coreTableColumnEntityLRUCache.put(rowEntity.getId(), rowEntity);
            List<CoreTableColumnEntity> listColumn = coreTableColumnByTableIdEntityLRUCache.get(rowEntity.getCore_table_id()).orElseGet(() -> {
                List<CoreTableColumnEntity> newColumns = new ArrayList<>();
                coreTableColumnByTableIdEntityLRUCache.put(rowEntity.getCore_table_id(), newColumns);
                return newColumns;
            });
            listColumn.add(rowEntity);
            return rowEntity;
        }));
    }

    public static TableMetadata findByTableName(String tableName) {
        Optional<CoreTableEntity> optionalCoreTableEntity = coreTableEntityByTableNameLRUCache.get(tableName);
        return optionalCoreTableEntity.map(coreTableEntity -> {
            TableMetadata.TableMetadataBuilder builder = TableMetadata.builder()
                    .id(coreTableEntity.getId())
                    .uuid(UUID.randomUUID().toString())
                    .masterTable(true)
                    .tableName(coreTableEntity.getTablename());
            Optional<List<CoreTableColumnEntity>> columns = coreTableColumnByTableIdEntityLRUCache.get(coreTableEntity.getId());
            columns.ifPresent(coreTableColumnEntities -> {
                coreTableColumnEntities.forEach(coreTableColumnEntity -> {
                    ColumnMetaModel columnMetaModel = new ColumnMetaModel();
                    columnMetaModel.columnType(CoreColumnType.String);
                    columnMetaModel.uuid(UUID.randomUUID().toString());
                    columnMetaModel.id(coreTableColumnEntity.getId());
                    columnMetaModel.columnName(coreTableColumnEntity.getName());
                    columnMetaModel.pk(ConvertUtil.convertBooleanPrimary(coreTableColumnEntity.getIs_pk()));

                    CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = new CoreTableColumnDataProviderDTO();
                    coreTableColumnDataProviderDTO.setId(coreTableColumnEntity.getCore_table_column_dataprovider_id());
                    columnMetaModel.coreTableColumnDataProviderDTO(coreTableColumnDataProviderDTO);

                    builder.AddColumn(coreTableColumnEntity.getId(), columnMetaModel);
                    builder.AddColumnBYName(coreTableColumnEntity.getName(), columnMetaModel);
                });
            });
            return builder
                    .build();
        }).orElse(null);
    }
}

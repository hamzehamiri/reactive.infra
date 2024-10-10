package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms;

import io.r2dbc.pool.ConnectionPool;
import io.r2dbc.pool.ConnectionPoolConfiguration;
import io.r2dbc.postgresql.api.PostgresTransactionDefinition;
import io.r2dbc.spi.Connection;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.IsolationLevel;
import io.r2dbc.spi.Row;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostClusterNodeDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.metadata.CoreTableColumnChanged;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.metadata.CoreTableMetaData;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public abstract class AbstractRDBMSReactorFactory<CONNECTIONFACTORY extends ConnectionFactory, QUERY extends AbstractRDBMSQueryProvider> {
    @Setter
    protected CoreTableDataSourceDTO dataBaseInfoModel;
    @Setter
    protected Map<String, String> connectionFactoryOptions;
    protected CONNECTIONFACTORY connectionFactory;
    protected ConnectionPoolConfiguration configurationConnectionPool;
    protected ConnectionPool connectionPool;
    protected CoreAllElementDTO coreAllElementDTO_Column;
    protected Function<Connection, Publisher<Void>> preRelease = connection -> {
        System.out.println(connection.getMetadata().getDatabaseVersion());
        return connection.beginTransaction();
    };

    public abstract void buildConnectionFactory();

    public abstract QUERY createQueryProvider(TableExpressionPrepare tableExpressionPrepare);

    public abstract QUERY createQueryProvider();

    public abstract Flux<CoreTableDTO> fetchAllCoreTables();

    public abstract CoreTableColumnDTO processColumn(Row row, Map<String, CoreTableColumnDTO> allOriginalColumn);

    public Mono<CoreTableMetaData> processTableColumnMetaData(CoreTableDTO coreTableDTO) {
        QUERY queryProvider = createQueryProvider();

        Map<String, CoreTableColumnDTO> mapOfOriginalColumns = new HashMap<>(coreTableDTO.getColumnDTOMap().size());

        for (Map.Entry<Long, CoreTableColumnDTO> longCoreTableColumnDTOEntry : coreTableDTO.getColumnDTOMap().entrySet()) {
            mapOfOriginalColumns.put(longCoreTableColumnDTOEntry.getValue().getName(), longCoreTableColumnDTOEntry.getValue());
        }

        CoreTableMetaData coreTableMetaData = new CoreTableMetaData();
        coreTableMetaData.setOriginal(coreTableDTO);

        if (this.coreAllElementDTO_Column == null)
            this.coreAllElementDTO_Column = CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Column);

        Flux<CoreTableColumnDTO> coreTableColumnDTOFlux = Flux.usingWhen(getRConnection(), CoreServiceBaseEntity.connectionConsumerStatic(queryProvider.queryForMetaDataColumn(coreTableDTO, dataBaseInfoModel)), Connection::close).flatMap(result -> {
            return result.map((row, rowMetadata) -> {
                return processColumn(row, mapOfOriginalColumns);
            });
        });

        return Mono.zip(coreTableColumnDTOFlux.collectList(), Mono.just("Ok")).map(objects -> {
            List<CoreTableColumnDTO> columnFromPhysicalDB = objects.getT1();

            List<CoreTableColumnChanged> changedColumns = new ArrayList<>();
            List<CoreTableColumnDTO> notCreatedColumn = new ArrayList<>();
            List<CoreTableColumnDTO> columnRemoved = new ArrayList<>();

            for (CoreTableColumnDTO coreTableColumnDTOPhysicalDB : columnFromPhysicalDB) {
                CoreTableColumnDTO coreTableColumnDTOOriginalDB = mapOfOriginalColumns.get(coreTableColumnDTOPhysicalDB.getName());
                if (coreTableColumnDTOOriginalDB != null) {
                    CoreTableColumnChanged coreTableColumnChanged = new CoreTableColumnChanged();
                    coreTableColumnChanged.setOriginalColumn(coreTableColumnDTOOriginalDB);
                    coreTableColumnChanged.setChangedColumn(coreTableColumnDTOPhysicalDB);

                    changedColumns.add(coreTableColumnChanged);
                } else {
                    notCreatedColumn.add(coreTableColumnDTOPhysicalDB);
                }
                mapOfOriginalColumns.remove(coreTableColumnDTOPhysicalDB.getName());
            }

            for (Map.Entry<String, CoreTableColumnDTO> stringCoreTableColumnDTOEntry : mapOfOriginalColumns.entrySet()) {
                columnRemoved.add(stringCoreTableColumnDTOEntry.getValue());
            }

            coreTableMetaData.setColumnChanged(changedColumns);
            coreTableMetaData.setColumnNotCreated(notCreatedColumn);
            coreTableMetaData.setColumnRemoved(columnRemoved);
            return coreTableMetaData;
        });
    }

    public void buildConnectionPool() {
        if (connectionFactory == null)
            throw new RuntimeException("Connection Factory Is Null");
        configurationConnectionPool = ConnectionPoolConfiguration.builder(connectionFactory)
                .maxIdleTime(Duration.ofMillis(1000))
                .maxSize(20)
                .name("HamzehPostgresPool")
                .initialSize(10)
                .preRelease(preRelease)
//                .metricsRecorder(new InfaPoolMetricsRecorder())
                .build();
        connectionPool = new ConnectionPool(configurationConnectionPool);
    }

    public Mono<Connection> getRConnection() {
        Mono<Connection> connectionMono = connectionPool.create();
        return connectionMono.flatMap(connection -> {
//            InfraConnectionFactoryProvider.registerConnection(dataBaseInfoModel, UUID.randomUUID().toString(), connection);
            PostgresTransactionDefinition transaction = PostgresTransactionDefinition.from(IsolationLevel.REPEATABLE_READ).readOnly().notDeferrable();
            return Mono.from(connection.beginTransaction(transaction)).then(Mono.just(connection));
        });
    }

    public Mono<Connection> getRWConnection() {
        Mono<Connection> dd = connectionPool.create();
        return dd;
//        return dd.flatMap(connection -> {
//            Publisher<? extends Result> ddf = connection.createStatement("").execute();
//            return Mono.just(ddf).then(Mono.just(connection));
//        });
    }

    private CoreHostClusterNodeDTO getActiveNode() {
        return dataBaseInfoModel.getCoreHostClusterDTO().getNodes().getFirst();
    }

    public String getDataBase() {
        return dataBaseInfoModel.getDataBase();
    }

    public String getSchema() {
        return dataBaseInfoModel.getSchema();
    }

    public String getHost() {
        CoreHostClusterNodeDTO cluster = getActiveNode();
        return cluster.getCoreHostDTO().getIpv4();
    }

    public int getPort() {
        CoreHostClusterNodeDTO cluster = getActiveNode();
        return cluster.getPort();
    }

    public String getUserName() {
        return dataBaseInfoModel.getUserName();
    }

    public String getPassword() {
        return dataBaseInfoModel.getPassword();
    }


}

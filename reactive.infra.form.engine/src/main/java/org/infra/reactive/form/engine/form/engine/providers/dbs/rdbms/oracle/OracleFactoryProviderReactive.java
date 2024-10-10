package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.oracle;

import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.ConnectionFactoryOptions;
import io.r2dbc.spi.Row;
import oracle.r2dbc.impl.OracleConnectionFactoryProviderImpl;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.AbstractReactorFactoryRegister;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.DBTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import reactor.core.publisher.Flux;

import java.util.Map;

@AbstractReactorFactoryRegister(registerKey = "oracle", DB_TYPE_ENUM = DBTypeEnum.RDBMS)
public class OracleFactoryProviderReactive extends AbstractRDBMSReactorFactory<ConnectionFactory, OracleQueryProvider> {
    @Override
    public void buildConnectionFactory() {
        ConnectionFactoryOptions connectionFactoryOptions = ConnectionFactoryOptions.builder()
                .option(ConnectionFactoryOptions.DRIVER, "a-driver")
                .option(ConnectionFactoryOptions.PROTOCOL, "pipes")
                .option(ConnectionFactoryOptions.USER, getUserName())
                .option(ConnectionFactoryOptions.PASSWORD, getPassword())
                .option(ConnectionFactoryOptions.HOST, getHost())
                .option(ConnectionFactoryOptions.PORT, getPort())
                .option(ConnectionFactoryOptions.DATABASE, getDataBase())
                .build();

        this.connectionFactory = new OracleConnectionFactoryProviderImpl().create(connectionFactoryOptions);
    }

    @Override
    public OracleQueryProvider createQueryProvider(TableExpressionPrepare tableExpressionPrepare) {
        OracleQueryProvider oracleQueryProvider = createQueryProvider();
        oracleQueryProvider.setTableExpressionPrepare(tableExpressionPrepare);
        return oracleQueryProvider;
    }

    @Override
    public OracleQueryProvider createQueryProvider() {
        OracleQueryProvider oracleQueryProvider = new OracleQueryProvider(null, new RDBMSAliasProvider());
        return oracleQueryProvider;
    }

    @Override
    public Flux<CoreTableDTO> fetchAllCoreTables() {
        return Flux.just(new CoreTableDTO());
    }

    @Override
    public CoreTableColumnDTO processColumn(Row row, Map<String, CoreTableColumnDTO> allOriginalColumn) {
        return null;
    }


}

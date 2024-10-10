package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.sqlserver;

import io.r2dbc.mssql.MssqlConnectionConfiguration;
import io.r2dbc.mssql.MssqlConnectionFactory;
import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.AbstractReactorFactoryRegister;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.DBTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import reactor.core.publisher.Flux;

import java.util.Map;

@AbstractReactorFactoryRegister(registerKey = "mssql", DB_TYPE_ENUM = DBTypeEnum.RDBMS)
public class SqlServerFactoryProviderReactive extends AbstractRDBMSReactorFactory<MssqlConnectionFactory, SqlServerQueryProvider> {
    @Override
    public void buildConnectionFactory() {
        MssqlConnectionConfiguration mssqlConnectionConfiguration = MssqlConnectionConfiguration.builder()
                .host(getHost())
                .port(getPort())
                .username(getUserName())
                .password(getPassword())
                .database(getDataBase())
                .build();

        this.connectionFactory = new MssqlConnectionFactory(mssqlConnectionConfiguration);
    }

    @Override
    public SqlServerQueryProvider createQueryProvider(TableExpressionPrepare tableExpressionPrepare) {
        SqlServerQueryProvider sqlServerQueryProvider = createQueryProvider();
        sqlServerQueryProvider.setTableExpressionPrepare(tableExpressionPrepare);
        return sqlServerQueryProvider;
    }

    @Override
    public SqlServerQueryProvider createQueryProvider() {
        SqlServerQueryProvider sqlServerQueryProvider = new SqlServerQueryProvider(null, new RDBMSAliasProvider());
        return sqlServerQueryProvider;
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

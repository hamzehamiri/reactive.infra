package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.mysql;

import io.asyncer.r2dbc.mysql.MySqlConnectionConfiguration;
import io.asyncer.r2dbc.mysql.MySqlConnectionFactory;
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

@AbstractReactorFactoryRegister(registerKey = "mysql", DB_TYPE_ENUM = DBTypeEnum.RDBMS)
public class MySQLFactoryProviderReactive extends AbstractRDBMSReactorFactory<MySqlConnectionFactory, MySQLQueryProvider> {
    @Override
    public void buildConnectionFactory() {
        MySqlConnectionConfiguration mySqlConnectionConfiguration = MySqlConnectionConfiguration.builder()
                .host(getHost())
                .port(getPort())
                .username(getUserName())
                .password(getPassword())
                .database(getDataBase())
                .build();

        this.connectionFactory = MySqlConnectionFactory.from(mySqlConnectionConfiguration);
    }

    @Override
    public MySQLQueryProvider createQueryProvider(TableExpressionPrepare tableExpressionPrepare) {
        MySQLQueryProvider mySQLQueryProvider = createQueryProvider();
        mySQLQueryProvider.setTableExpressionPrepare(tableExpressionPrepare);
        return mySQLQueryProvider;
    }

    @Override
    public MySQLQueryProvider createQueryProvider() {
        MySQLQueryProvider mySQLQueryProvider = new MySQLQueryProvider(null, new RDBMSAliasProvider());
        return mySQLQueryProvider;
    }

    @Override
    public Flux<CoreTableDTO> fetchAllCoreTables() {
        return Flux.just(new CoreTableDTO());
    }

    @Override
    public CoreTableColumnDTO processColumn(Row row, Map<String, CoreTableColumnDTO> allOriginalColumn) {
        CoreTableColumnDTO coreTableColumnDTO = new CoreTableColumnDTO();
        coreTableColumnDTO.setName(row.get("column_name", String.class));
        return coreTableColumnDTO;
    }

}

package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.sqlserver;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QueryInsertWithParamModel;

public class SqlServerQueryProvider extends AbstractRDBMSQueryProvider {

    public SqlServerQueryProvider(SqlServerQueryProvider parentPostgresQueryProvider, RDBMSAliasProvider rdbmsAliasProvider) {
        super(parentPostgresQueryProvider);
        this.rdbmsAliasProvider = rdbmsAliasProvider;
    }

    @Override
    public void generateQueryWithParam() {
    }

    @Override
    public <T> QueryInsertWithParamModel insertOrUpdateQueryWithParam(T o) {
        return null;
    }

    @Override
    public String queryForMetaDataColumn(CoreTableDTO coreTableDTO, CoreTableDataSourceDTO dataBaseInfoModel) {
        return "";
    }
}

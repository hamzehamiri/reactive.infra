package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql;

import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;

@Setter
public abstract class AbstractNoSQLReactorConnectionFactory<CONNECTION extends AbstractNoSQLReactorConnection> {
    protected CoreTableDataSourceDTO coreTableDataSourceDTO;
    public abstract void buildConnectionFactory();

    public abstract CONNECTION getConnection();
}

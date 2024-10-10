package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;

@Setter
@Getter
public abstract class AbstractNoSQLReactorFactory<CONNECTIONFACTORY extends AbstractNoSQLReactorConnectionFactory<?>, QUERY extends AbstractNoSQLQueryProvider> {

    protected CoreTableDataSourceDTO coreTableDataSourceDTO;
    protected CONNECTIONFACTORY connectionfactory;

    public abstract void buildConnectionFactory();

    public abstract void buildConnectionPool();

    public abstract QUERY createQueryProvider();
}

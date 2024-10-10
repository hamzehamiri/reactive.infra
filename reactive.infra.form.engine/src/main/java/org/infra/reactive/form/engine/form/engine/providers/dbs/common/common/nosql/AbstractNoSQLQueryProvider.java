package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.listeners.AbstractQueryListener;

public class AbstractNoSQLQueryProvider extends AbstractQueryListener {
    public AbstractNoSQLQueryProvider(AbstractQueryListener parentAbstractQueryListener) {
        super(parentAbstractQueryListener);
    }
}

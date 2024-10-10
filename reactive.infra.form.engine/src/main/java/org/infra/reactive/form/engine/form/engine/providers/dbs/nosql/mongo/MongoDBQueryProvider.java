package org.infra.reactive.form.engine.form.engine.providers.dbs.nosql.mongo;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.listeners.AbstractQueryListener;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLQueryProvider;

public class MongoDBQueryProvider extends AbstractNoSQLQueryProvider {

    public MongoDBQueryProvider(AbstractQueryListener parentAbstractQueryListener) {
        super(parentAbstractQueryListener);
    }
}

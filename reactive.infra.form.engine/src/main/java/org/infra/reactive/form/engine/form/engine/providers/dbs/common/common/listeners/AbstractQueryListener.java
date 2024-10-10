package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.listeners;

import org.infra.reactive.form.engine.form.engine.providers.common.AbstractListener;

public class AbstractQueryListener extends AbstractListener<QueryEventEnum, QueryEventSourceData> {

    protected AbstractQueryListener parentAbstractQueryListener;

    public AbstractQueryListener(AbstractQueryListener parentAbstractQueryListener) {
        this.parentAbstractQueryListener = parentAbstractQueryListener;
    }
}

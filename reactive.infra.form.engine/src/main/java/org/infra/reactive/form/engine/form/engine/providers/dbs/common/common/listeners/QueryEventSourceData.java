package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.listeners;

import lombok.Data;

@Data
public class QueryEventSourceData {
    private Object source;

    public QueryEventSourceData(Object source) {
        this.source = source;
    }
}

package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.postgres;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.dialect.FunctionDialectDB;

public class PostgresFunctionDialectDB implements FunctionDialectDB {
    @Override
    public String NextSequence(Object... param) {
        return "nextval";
    }

    @Override
    public String Sum(Object... param) {
        return "sum";
    }
}

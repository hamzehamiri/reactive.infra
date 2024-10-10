package org.infra.reactive.form.engine.form.engine.providers.dbs.common.dialect;

public interface FunctionDialectDB {
    String NextSequence(Object ...param);
    String Sum(Object ...param);
}

package org.infra.reactive.form.engine.form.engine.setup;

import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Result;
import io.r2dbc.spi.Statement;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QueryInsertWithParamModel;
import org.reactivestreams.Publisher;

import java.util.function.Function;

public class FlowExecuteConnection {

    private QueryInsertWithParamModel insertQuery;

    public FlowExecuteConnection(QueryInsertWithParamModel insertQuery) {
        this.insertQuery = insertQuery;
    }

    public Function<Connection, ? extends Publisher<? extends Result>> mapperConnection() {
        return (connection -> {
            Statement statement = connection.createStatement(this.insertQuery.getQuery()).returnGeneratedValues("id");
            insertQuery.getParamValue().forEach((index, Value) -> {
                statement.bind(index - 1, Value);
            });
            return statement.execute();
        });
    }

    public Function<Result, ? extends Publisher<Long>> mapperRecord() {
        return result -> {
            return result.map((row, rowMetadata) -> {
                return row.get("id", Long.class);
            });
        };
    }
}

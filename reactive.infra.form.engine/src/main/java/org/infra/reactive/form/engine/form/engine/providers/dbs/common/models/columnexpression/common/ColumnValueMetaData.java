package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ColumnValueMetaData {
    private ColumnExpression columnExpression;
    private Object value;
}

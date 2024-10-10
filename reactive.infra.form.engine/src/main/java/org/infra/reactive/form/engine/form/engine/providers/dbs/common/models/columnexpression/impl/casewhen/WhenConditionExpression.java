package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen;

import lombok.Builder;
import lombok.Data;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

@Data
@Builder
public class WhenConditionExpression {
    private ColumnExpression columnExpression;
    private ComparisonOperatorsValue operationValue;
}

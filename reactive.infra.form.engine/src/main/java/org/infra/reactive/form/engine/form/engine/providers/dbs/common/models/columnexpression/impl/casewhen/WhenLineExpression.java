package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.util.List;

@Value
@Builder
public class WhenLineExpression extends ColumnExpression {
    @Singular("AddWhenExpressionCondition")
    List<WhenConditionExpression> whenConditionExpressions;

    Object thenValue;

    @Override
    public String columnName() {
        return null;
    }

    @Override
    public String getID() {
        return null;
    }

    @Override
    public long getId() {
        return 0;
    }

    @Override
    public void generateAlias() {

    }
}

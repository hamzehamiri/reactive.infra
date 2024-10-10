package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.util.List;

@Value
@Builder
public class CaseWhenColumnExpression extends ColumnExpression {
    @Singular("AddWhenExpressionLine")
    List<WhenLineExpression> whenLineExpressions;
    Object elseValue;

    @Override
    public String columnName() {
        return null;
    }

    @Override
    public String getID() {
        return "";
    }

    @Override
    public long getId() {
        return 0;
    }

    @Override
    public void generateAlias() {
        setAliasColumnName(RDBMSAliasProvider.nextAliasColumnName());
    }
}

package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.multicolumn;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.util.List;

@Value
@Builder
public class MultiColumnExpression extends ColumnExpression {

    public static final String separator = "|| '-' ||";

    @Singular("AddColumnExpression")
    List<ColumnExpression> columnExpressionList;

    @Override
    public String columnName() {
        return null;
    }

    @Override
    public String getID() {
        return "1";
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

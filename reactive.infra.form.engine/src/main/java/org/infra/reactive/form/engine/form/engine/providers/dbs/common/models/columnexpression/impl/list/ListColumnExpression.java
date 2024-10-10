package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.list;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

public class ListColumnExpression extends ColumnExpression {
    private String uuid;

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public String columnName() {
        return this.columnName;
    }

    @Override
    public String getID() {
        return uuid;
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

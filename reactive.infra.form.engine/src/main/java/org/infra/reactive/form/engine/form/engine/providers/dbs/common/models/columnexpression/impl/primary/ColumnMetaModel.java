package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

public class ColumnMetaModel extends ColumnExpression {

    private long id;
    private String uuid;
    private String columnTitle;
    private boolean pk;

    public boolean isPk() {
        return pk;
    }

    public ColumnMetaModel id(long id) {
        this.id = id;
        return this;
    }

    public ColumnMetaModel coreTableColumnDataProviderDTO(CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO) {
        this.coreTableColumnDataProviderDTO = coreTableColumnDataProviderDTO;
        return this;
    }

    public String getUuid() {
        return uuid;
    }

    public ColumnMetaModel uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public ColumnMetaModel columnName(String columnName) {
        this.columnName = columnName;
        return this;
    }

    public String getColumnTitle() {
        return columnTitle;
    }

    public ColumnMetaModel columnTitle(String columnTitle) {
        this.columnTitle = columnTitle;
        return this;
    }

    public ColumnMetaModel pk(boolean pk) {
        this.pk = pk;
        return this;
    }

    @Override
    public String columnName() {
        return columnName;
    }

    @Override
    public String getID() {
        return getUuid();
    }

    public long getId() {
        return id;
    }

    @Override
    public void generateAlias() {
        setAliasColumnName(RDBMSAliasProvider.nextAliasColumnName());
    }

    @Override
    public String toString() {
        return "ColumnMetaModel{" +
                "id=" + id +
                ", columnName='" + columnName + '\'' +
                '}';
    }
}

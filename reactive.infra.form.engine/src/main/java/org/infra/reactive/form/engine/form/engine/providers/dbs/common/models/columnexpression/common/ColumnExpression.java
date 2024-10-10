package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;

public abstract class ColumnExpression {

    @Getter
    protected CoreColumnType columnType;
    @Getter
    protected TableInterface tableInterface;
    @Getter
    protected String aliasColumnName;
    @Getter
    @Setter
    protected String columnName;
    protected boolean generateAliases;
    protected long fieldId;
    protected RDBMSAliasProvider RDBMSAliasProvider;
    @Getter
    @Setter
    protected CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
    @Getter
    @Setter
    protected CoreWindowTabFieldSortOrderProfileDTO coreWindowTabFieldSortOrderProfileDTO;

    public <T> T setTableInterface(TableInterface tableInterface) {
        this.tableInterface = tableInterface;
        return (T) this;
    }


    public <T> T columnType(CoreColumnType columnType) {
        this.columnType = columnType;
        return (T) this;
    }

    public <T> T setAliasColumnName(String aliasColumnName) {
        this.aliasColumnName = aliasColumnName;
        return (T) this;
    }

    public <T> T setAliasConsumer(RDBMSAliasProvider RDBMSAliasProvider) {
        this.RDBMSAliasProvider = RDBMSAliasProvider;
        return (T) this;
    }

    public long getFieldId() {
        return fieldId;
    }

    public <T> T setFieldId(long fieldId) {
        this.fieldId = fieldId;
        return (T) this;
    }

    public boolean isGenerateAliases() {
        return generateAliases;
    }

    public void setGenerateAliases(boolean generateAliases) {
        this.generateAliases = generateAliases;
    }

    public void generateAliasAllElements() {
        generateAlias();
        setGenerateAliases(true);
    }

    public abstract String columnName();

    public abstract String getID();

    public abstract long getId();

    public abstract void generateAlias();

    public boolean isPk() {
        return false;
    }
}

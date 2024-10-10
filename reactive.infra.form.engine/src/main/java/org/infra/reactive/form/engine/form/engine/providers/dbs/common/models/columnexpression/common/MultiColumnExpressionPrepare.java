package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common;

import lombok.Getter;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Getter
public abstract class MultiColumnExpressionPrepare<C extends ColumnExpression, KEY extends Serializable> extends ColumnExpressionPrepare<C, KEY> {
    protected Map<String, ColumnExpressionPrepare<?, ?>> columnExpressionPrepareWithColumnIdMap = new HashMap<>();
    protected Map<String ,ColumnExpressionPrepare<?, ?>> columnExpressionPrepareWithColumnIdOtherDataSourceMap = new HashMap<>();
    protected Map<String, DataProviderJavaAbstract<?, ?, Long>> mapDataProviderJavaAbstract = new HashMap<>();

    public <T extends MultiColumnExpressionPrepare<C, KEY>> T addColumnExpressionPrepareWithColumnIdMap(String uuidColumn, ColumnExpressionPrepare<?, ?> columnExpressionPrepare) {
        this.columnExpressionPrepareWithColumnIdMap.put(uuidColumn, columnExpressionPrepare);
        return (T) this;
    }

    public <T extends MultiColumnExpressionPrepare<C, KEY>> T addColumnExpressionPrepareWithColumnIdOtherDataSourceMap(String uuidColumn, ColumnExpressionPrepare<?, ?> columnExpressionPrepare) {
        this.columnExpressionPrepareWithColumnIdOtherDataSourceMap.put(uuidColumn, columnExpressionPrepare);
        return (T) this;
    }

    public <T extends MultiColumnExpressionPrepare<C, KEY>> T addMapDataProviderJavaAbstract(String uuidColumn, DataProviderJavaAbstract<?, ?, Long> dataProviderJavaAbstract) {
        this.mapDataProviderJavaAbstract.put(uuidColumn, dataProviderJavaAbstract);
        return (T) this;
    }

}

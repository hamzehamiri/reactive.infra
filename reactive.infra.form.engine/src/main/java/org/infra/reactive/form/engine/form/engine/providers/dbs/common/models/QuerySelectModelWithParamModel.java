package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models;

import lombok.Data;
import lombok.Singular;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSQueryStringBuilder;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;

import java.util.List;
import java.util.Map;

@Data
public class QuerySelectModelWithParamModel {
    @Singular("AddParamValue")
    private Map<Integer, Object> paramValue;
    private RDBMSQueryStringBuilder rdbmsQueryStringBuilder;
    private TableExpressionPrepare selectModel;
    private Map<String, String> mapColumnAlias;
    private Map<Long, List<String>> mapFieldIdUUIDColumn;
    private Map<String, ColumnExpression> mapColumnUUIDToColumnsExpression;
    private Map<String, DataProviderJavaAbstract<?, ?, Long>> mapDataProviderJavaAbstract;
    private CoreWindowTabDTO coreWindowTabDTO;

    public QuerySelectModelWithParamModel setCoreWindowTabDTO(CoreWindowTabDTO coreWindowTabDTO) {
        this.coreWindowTabDTO = coreWindowTabDTO;
        return this;
    }

    public QuerySelectModelWithParamModel setSelectModel(TableExpressionPrepare selectModel) {
        this.selectModel = selectModel;
        return this;
    }

    public QuerySelectModelWithParamModel setRdbmsQueryStringBuilder(RDBMSQueryStringBuilder rdbmsQueryStringBuilder) {
        this.rdbmsQueryStringBuilder = rdbmsQueryStringBuilder;
        return this;
    }

    public QuerySelectModelWithParamModel setParamValue(Map<Integer, Object> paramValue) {
        this.paramValue = paramValue;
        return this;
    }

    public QuerySelectModelWithParamModel setMapColumnAlias(Map<String, String> mapColumnAlias) {
        this.mapColumnAlias = mapColumnAlias;
        return this;
    }

    public QuerySelectModelWithParamModel setMapFieldIdUUIDColumn(Map<Long, List<String>> mapFieldIdUUIDColumn) {
        this.mapFieldIdUUIDColumn = mapFieldIdUUIDColumn;
        return this;
    }

    public QuerySelectModelWithParamModel setMapColumnUUIDToColumnsExpression(Map<String, ColumnExpression> mapColumnUUIDToColumnsExpression) {
        this.mapColumnUUIDToColumnsExpression = mapColumnUUIDToColumnsExpression;
        return this;
    }

    public QuerySelectModelWithParamModel setMapDataProviderJavaAbstract(Map<String, DataProviderJavaAbstract<?, ?, Long>> mapDataProviderJavaAbstract) {
        this.mapDataProviderJavaAbstract = mapDataProviderJavaAbstract;
        return this;
    }

}

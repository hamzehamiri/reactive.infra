package org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.KeyValueDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;
import java.util.Map;

public class DataProviderCompositeJavaAbstract extends DataProviderJavaAbstract<KeyValueDTO<Long, Long>, ColumnExpression, Serializable> {

    private Map<String, DataProviderJavaAbstract<?, ?, ?>> mapDataProviderJavaAbstract;

    public DataProviderCompositeJavaAbstract(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    public DataProviderCompositeJavaAbstract setMapDataProviderJavaAbstract(Map<String, DataProviderJavaAbstract<?, ?, ?>> mapDataProviderJavaAbstract) {
        this.mapDataProviderJavaAbstract = mapDataProviderJavaAbstract;
        return this;
    }

    @Override
    public KeyValueDTO<Long, Long> convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        return null;
    }

    @Override
    public KeyValueDTO<Long, Long> convertFromRawData(Object object) {
        return null;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Table;
    }


    @Override
    public void convertQuery() {

    }
}

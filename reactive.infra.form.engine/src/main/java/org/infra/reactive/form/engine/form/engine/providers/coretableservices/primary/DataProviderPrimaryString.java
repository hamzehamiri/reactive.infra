package org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorString;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_StringTypePrimary,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Primary
)
public class DataProviderPrimaryString extends DataProviderJavaAbstract<EditorString, ColumnExpression, Serializable> {
    public DataProviderPrimaryString(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public EditorString convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        Object data = row.get(columnExpression.getAliasColumnName());
        return convertFromRawData(data);
    }

    @Override
    public EditorString convertFromRawData(Object data) {
        EditorString dataProviderString = new EditorString();
        if (data != null) {
            dataProviderString.setKey(data.toString());
            dataProviderString.setOriginalData(data.toString());
        }
        dataProviderString.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        return dataProviderString;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Primary;
    }

    @Override
    public void convertQuery() {

    }
}

package org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorBoolean;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_BooleanTypePrimary,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Primary
)
public class DataProviderPrimaryBoolean extends DataProviderJavaAbstract<EditorBoolean, ColumnExpression , Serializable> {
    public DataProviderPrimaryBoolean(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public EditorBoolean convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        Object data = row.get(columnExpression.getAliasColumnName());
        return convertFromRawData(data);
    }

    @Override
    public EditorBoolean convertFromRawData(Object data) {
        EditorBoolean dataProviderBoolean = new EditorBoolean();
        if (data != null) {
            dataProviderBoolean.setKey(data.toString());
            dataProviderBoolean.setOriginalData(data.toString());
        }
        dataProviderBoolean.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        return dataProviderBoolean;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Primary;
    }

    @Override
    public void convertQuery() {

    }
}

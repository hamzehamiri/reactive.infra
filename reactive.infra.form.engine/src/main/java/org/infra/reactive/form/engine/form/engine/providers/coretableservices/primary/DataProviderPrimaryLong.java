package org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorLong;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_NumberTypePrimary,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Primary
)
public class DataProviderPrimaryLong extends DataProviderJavaAbstract<EditorLong, ColumnExpression, Serializable> {
    public DataProviderPrimaryLong(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public EditorLong convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        Object data = row.get(columnExpression.getAliasColumnName());
        return convertFromRawData(data);
    }

    @Override
    public EditorLong convertFromRawData(Object data) {
        EditorLong dataProviderLong = new EditorLong();
        if (data != null) {
            long value = Long.parseLong(data.toString());
            dataProviderLong.setKey(value);
            dataProviderLong.setOriginalData(value);
        } else {
//            dataProviderLong.setKey(0L);
        }
        dataProviderLong.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        return dataProviderLong;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Primary;
    }

    @Override
    public void convertQuery() {

    }
}

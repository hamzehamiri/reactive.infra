package org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorCron;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_CronTypePrimary,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Primary
)
public class DataProviderPrimaryCron extends DataProviderJavaAbstract<EditorCron, ColumnExpression , Serializable> {
    public DataProviderPrimaryCron(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public EditorCron convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        Object data = row.get(columnExpression.getAliasColumnName());
        return convertFromRawData(data);
    }

    @Override
    public EditorCron convertFromRawData(Object data) {
        EditorCron dataProviderCron = new EditorCron();
        if (data != null) {
            dataProviderCron.setKey(data.toString());
            dataProviderCron.setOriginalData(data.toString());
        }
        dataProviderCron.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        return dataProviderCron;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Primary;
    }

    @Override
    public void convertQuery() {

    }
}

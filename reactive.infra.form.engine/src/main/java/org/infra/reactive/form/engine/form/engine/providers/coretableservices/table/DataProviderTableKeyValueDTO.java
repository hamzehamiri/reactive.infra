package org.infra.reactive.form.engine.form.engine.providers.coretableservices.table;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.KeyValueDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_KeyValueDTOSerializer,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Table
)
public class DataProviderTableKeyValueDTO extends DataProviderJavaAbstract<KeyValueDTO<ArrayList<Long>, Serializable>, TableExpression, Long> {

    protected Map<String, DataProviderJavaAbstract<?, ?, Long>> mapColumnSelectedDataProviderJava;

    public DataProviderTableKeyValueDTO(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public KeyValueDTO<ArrayList<Long>, Serializable> convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        StringBuilder display = new StringBuilder();

        // TODO Hatman Baraye Zoom Bayad Kole Dadeha be Sorate key => KeyValueDTO
        KeyValueDTO<ArrayList<Long>, Serializable> keyValueDTO = new KeyValueDTO<>();
        ArrayList<Long> allPkIds = new ArrayList<>(getColumnExpression().getPkColumns().size());

        for (Map.Entry<String, DataProviderJavaAbstract<?, ?, Long>> stringDataProviderJavaAbstractEntry : mapColumnSelectedDataProviderJava.entrySet()) {
            DataProviderJavaAbstract<?, ?, ?> converter = stringDataProviderJavaAbstractEntry.getValue();
            converter.setCoreTranslateLanguageDTO(this.coreTranslateLanguageDTO);
            DataProviderAbstract<?, ?> data = converter.convertJava(row, querySelectModelWithParamModel);
            if (data != null) {
                display.append(data.getDisplay()).append(separatorChar);
            } else {
                display.append("***").append(separatorChar);
            }
        }
        if (!display.isEmpty())
            display.delete(display.length() - separatorChar.length(), display.length());

        for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : getColumnExpression().getPkColumns().entrySet()) {
            Object pkValue = row.get(stringColumnExpressionEntry.getValue().getAliasColumnName());
            if (pkValue instanceof Long pkValueLong) {
                allPkIds.add(pkValueLong);
            }
        }

        keyValueDTO.setKey(allPkIds);
        keyValueDTO.setDisplay(display.toString());
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        return keyValueDTO;
    }

    @Override
    public KeyValueDTO<ArrayList<Long>, Serializable> convertFromRawData(Object object) {
        return null;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Table;
    }

    @Override
    public void convertQuery() {

    }

    public DataProviderTableKeyValueDTO setMapColumnSelectedDataProviderJava(Map<String, DataProviderJavaAbstract<?, ?, Long>> mapColumnSelectedDataProviderJava) {
        this.mapColumnSelectedDataProviderJava = mapColumnSelectedDataProviderJava;
        return this;
    }
}

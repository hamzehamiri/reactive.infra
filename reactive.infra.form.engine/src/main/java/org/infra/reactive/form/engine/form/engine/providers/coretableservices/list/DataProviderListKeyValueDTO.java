package org.infra.reactive.form.engine.form.engine.providers.coretableservices.list;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderListDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderListValuesDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.KeyValueLongSerializableDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.list.ListColumnExpression;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;

import java.io.Serializable;
import java.util.Optional;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_KeyValueDTOListSerializer,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.List
)
public class DataProviderListKeyValueDTO extends DataProviderJavaAbstract<KeyValueLongSerializableDTO, ListColumnExpression, Serializable> {

    public DataProviderListKeyValueDTO(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public KeyValueLongSerializableDTO convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        Optional<CoreTableColumnDataProviderListDTO> listValue = CoreServiceDTOTable.coreTableColumnDataProviderListDTOLRUCache.get(columnExpression.getCoreTableColumnDataProviderDTO().getCoreTableColumnDataProviderTypeRecordId());

        Integer keyValue = row.get(columnExpression.getAliasColumnName(), Integer.class);
        // TODO Hatman Baraye Zoom Bayad Kole Dadeha be Sorate key => KeyValueDTO
        KeyValueLongSerializableDTO keyValueLongSerializableDTO = new KeyValueLongSerializableDTO();
        if (keyValue != null && listValue.isPresent()) {
            long key = keyValue.longValue();
            String translate = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.CoreTableColumnDataProviderListValues, coreTranslateLanguageDTO, key);

            CoreTableColumnDataProviderListValuesDTO keyValueModel = listValue.get().getCoreTableColumnDataProviderListValuesDTODTOMap().get(key);

            keyValueLongSerializableDTO.setKey(key);
            keyValueLongSerializableDTO.setDisplay(translate);
            keyValueLongSerializableDTO.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
            keyValueLongSerializableDTO.setOriginalData(keyValueModel);
        }
        return keyValueLongSerializableDTO;
    }

    @Override
    public KeyValueLongSerializableDTO convertFromRawData(Object object) {
        return null;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.List;
    }

    @Override
    public void convertQuery() {

    }
}

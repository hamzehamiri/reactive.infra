package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;

import java.util.Map;

@Data
public class CoreTableColumnDataProviderListDTO {
    private Long id;
    private String name;
    private CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO;
    private Map<Long, CoreTableColumnDataProviderListValuesDTO> coreTableColumnDataProviderListValuesDTODTOMap;
}

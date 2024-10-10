package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;

@Data
public class CoreTableColumnDataProviderDTO {
    private Long id;
    private String name;
    private Integer coreTableColumnDataProviderTypeId;
    private Long coreTableColumnDataProviderTypeRecordId;
    private CoreTableColumnDataProviderWithSerializerDTO coreTableColumnDataProviderWithSerializerDTO;
}

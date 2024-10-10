package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;

@Data
public class CoreTableColumnDataProviderPrimaryDTO {
    private Long id;
    private String name;
    private CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO;
}

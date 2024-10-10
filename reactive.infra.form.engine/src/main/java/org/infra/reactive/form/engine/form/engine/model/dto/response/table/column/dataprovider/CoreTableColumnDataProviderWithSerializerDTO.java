package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreTableColumnDataProviderWithSerializerDTO {
    private CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum;
    private CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO;
}

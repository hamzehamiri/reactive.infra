package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;

import java.util.Map;

@Data
public class CoreTableColumnDataProviderTreeDTO {
    private Long id;
    private String name;
    private Long coreTableId;
    private CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO;
    private CoreTableColumnDTO coreTableColumnDTO;
    private CoreTableColumnDTO CoreTableColumnDTOParent;
    private Map<Long, CoreTableColumnDataProviderTreeColumnsDTO> coreTableColumnDataProviderTreeColumnsDTOMap;
}

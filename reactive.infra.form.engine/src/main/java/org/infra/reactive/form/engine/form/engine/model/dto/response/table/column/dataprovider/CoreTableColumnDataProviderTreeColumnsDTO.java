package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;

@Data
public class CoreTableColumnDataProviderTreeColumnsDTO {
    private Long id;
    private CoreTableColumnDTO coreTableColumnDTO;
    private int index;
}

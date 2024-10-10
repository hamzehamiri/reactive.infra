package org.infra.reactive.form.engine.form.engine.model.dto.response.table;

import lombok.Data;

@Data
public class CoreTableColumnSequenceDTO {
    private Long id;
    private Long coreTableId;
    private Long coreTableColumnId;
    private Long coreTenantId;
    private Long minValue;
    private Long maxValue;
    private Long currentValue;
    private String name;
}

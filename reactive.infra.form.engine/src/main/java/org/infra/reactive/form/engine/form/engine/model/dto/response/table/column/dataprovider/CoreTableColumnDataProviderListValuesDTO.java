package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreTableColumnDataProviderListValuesDTO implements Serializable {
    private Long id;
    private String key;
    private String displayValue;
    private String translate;
}

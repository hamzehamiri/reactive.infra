package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreTableColumnDataProviderSerializerDTO {
    private long id;
    private String name;
    private String clientRegisterKey;
    private String serverRegisterKey;
}

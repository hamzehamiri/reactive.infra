package org.infra.reactive.form.engine.form.engine.model.dto.response.table;

import lombok.Data;

@Data
public class CoreTableDataSourceTypeDTO {
    private long id;
    private String name;
    private Boolean rdbms;
    private Boolean nosql;
}

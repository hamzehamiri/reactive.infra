package org.infra.reactive.form.engine.form.engine.model.dto.response.table;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
public class CoreTableDTO implements Serializable {
    private Long id;
    private String name;
    private String title;
    private Long core_table_datasource_id;
    private String tablename;
    private List<CoreTableColumnDTO> columns;
    private List<CoreTableColumnDTO> pkColumns;
    private Map<Long, CoreTableColumnDTO> pkColumnDTOMap;
    private Map<Long, CoreTableColumnDTO> columnDTOMap;
}

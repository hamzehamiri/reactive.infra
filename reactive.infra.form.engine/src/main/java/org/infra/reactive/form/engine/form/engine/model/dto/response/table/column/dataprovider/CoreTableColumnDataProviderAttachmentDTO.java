package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;

@Data
public class CoreTableColumnDataProviderAttachmentDTO {
    private Long id;
    private String name;
    private CoreTableDTO coreAttachmentTable;
    private CoreTableDTO coreAttachmentAssignElementTable;
    private CoreTableDataSourceDTO bytesDataSource;
    private CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO;
}

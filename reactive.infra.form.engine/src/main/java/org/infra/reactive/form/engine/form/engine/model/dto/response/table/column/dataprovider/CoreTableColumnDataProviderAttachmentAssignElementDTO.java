package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

@Data
public class CoreTableColumnDataProviderAttachmentAssignElementDTO {
    private Long id;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private Long coreTableColumnDataProviderAttachmentId;
}

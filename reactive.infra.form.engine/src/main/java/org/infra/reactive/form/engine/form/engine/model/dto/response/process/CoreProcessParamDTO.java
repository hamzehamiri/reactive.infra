package org.infra.reactive.form.engine.form.engine.model.dto.response.process;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutDataAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreProcessParamDTO {
    private long id;
    private String name;
    private String translate;
    private CoreTableColumnEditorDTO coreTableColumnEditorDTO;
    private CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
    private Map<Long, CoreLayoutDataAssignElementDTO> coreLayoutDataAssignElementDTOMap;
    private boolean active;
    private int index;
}

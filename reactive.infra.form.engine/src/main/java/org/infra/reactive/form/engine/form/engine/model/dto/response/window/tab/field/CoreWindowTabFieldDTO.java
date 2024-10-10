package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutDataAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;

import java.io.Serializable;
import java.util.Map;

@Data
public class CoreWindowTabFieldDTO implements Serializable {
    private long id;
    private Long coreTabId;
    private Integer columnIndex;
    private boolean active;
    private String name;
    private String translate;
    private CoreTableColumnDTO coreTableColumnDTO;
    private CoreTableColumnEditorDTO coreTableColumnEditorDTO;
    private CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
    private Map<Long, CoreLayoutDataAssignElementDTO> coreLayoutDataAssignElementDTOMap;
}

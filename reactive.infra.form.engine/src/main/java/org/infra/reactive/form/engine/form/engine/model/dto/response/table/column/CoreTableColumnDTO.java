package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementPropertiesValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;

import java.io.Serializable;
import java.util.List;

@Data
public class CoreTableColumnDTO implements Serializable {
    private Long id;
    private String name;
    private String tableName;
    private String translate;
    private CoreTableColumnEditorDTO coreTableColumnEditorDTO;
    private Long coreTableId;
    private boolean pk;
    private CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
    private List<CoreAllElementPropertiesValueDTO> coreAllElementPropertiesValueDTOS;
}

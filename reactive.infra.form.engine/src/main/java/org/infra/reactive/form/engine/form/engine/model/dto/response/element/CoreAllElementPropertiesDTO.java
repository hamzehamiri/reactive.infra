package org.infra.reactive.form.engine.form.engine.model.dto.response.element;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;

import java.io.Serializable;

@Data
public class CoreAllElementPropertiesDTO implements Serializable {
    private long id;
    private String name;
    private CoreAllElementDTO coreAllElementDTO;
    private long recordId;
    private CoreTableColumnEditorDTO coreTableColumnEditorDTO;
    private CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
    private String registerKey;
}

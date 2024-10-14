package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.filter;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;

import java.io.Serializable;

@Data
public class CoreWindowTabFilterFieldDTO implements Serializable {
    private Long id;
    private Long coreWindowTabFilterId;
    private CoreWindowTabFieldDTO coreWindowTabFieldDTO;
    private CoreTableColumnEditorDTO coreTableColumnEditorDTO;
}

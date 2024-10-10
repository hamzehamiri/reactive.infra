package org.infra.reactive.form.engine.form.engine.model.dto.response.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreFilterOperationParamDTO implements Serializable {
    private long id;
    private String name;
    private String translate;
    private boolean referOriginalEditor;
    private CoreTableColumnEditorDTO coreTableColumnEditorDTO;
}

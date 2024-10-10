package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreTableColumnEditorDTO implements Serializable {
    private Long id;
    private String name;
    private String editorClassRegisterKey;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.table.metadata;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;

import java.io.Serializable;

@Data
public class CoreTableColumnChanged implements Serializable {
    private CoreTableColumnDTO originalColumn;
    private CoreTableColumnDTO changedColumn;
}

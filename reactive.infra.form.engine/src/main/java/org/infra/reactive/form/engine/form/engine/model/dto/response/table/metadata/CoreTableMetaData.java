package org.infra.reactive.form.engine.form.engine.model.dto.response.table.metadata;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;

import java.io.Serializable;
import java.util.List;

@Data
public class CoreTableMetaData implements Serializable {
    private CoreTableDTO original;
    private CoreTableDTO changed;
    private List<CoreTableColumnDTO> columnNotCreated;
    private List<CoreTableColumnChanged> columnChanged;
    private List<CoreTableColumnDTO> columnRemoved;
}

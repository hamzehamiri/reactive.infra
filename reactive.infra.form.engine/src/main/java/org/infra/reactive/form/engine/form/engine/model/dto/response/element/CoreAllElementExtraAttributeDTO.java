package org.infra.reactive.form.engine.form.engine.model.dto.response.element;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreAllElementExtraAttributeDTO implements Serializable {
    private Long id;
    private String name;
    private Long coreAllElementId;
    private CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
}

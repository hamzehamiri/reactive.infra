package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWindowTabColumnProfileDTO {
    private long fieldId;
    private int widthColumn;
    private int indexColumn;
    private CoreWindowTabFieldSortOrderProfileDTO sortOrder;
}

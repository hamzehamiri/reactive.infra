package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWindowTabFieldProfileDTO {
    private long fieldId;
    private int columnIndex;
    private int columnWidth;
}

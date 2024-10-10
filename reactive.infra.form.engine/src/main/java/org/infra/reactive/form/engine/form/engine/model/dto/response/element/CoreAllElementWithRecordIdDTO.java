package org.infra.reactive.form.engine.form.engine.model.dto.response.element;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreAllElementWithRecordIdDTO {
    private CoreAllElementDTO coreAllElementDTO;
    private long recordId;
}

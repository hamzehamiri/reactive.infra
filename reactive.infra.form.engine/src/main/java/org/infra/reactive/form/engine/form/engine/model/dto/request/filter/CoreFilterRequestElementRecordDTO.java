package org.infra.reactive.form.engine.form.engine.model.dto.request.filter;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
public class CoreFilterRequestElementRecordDTO implements Serializable {
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.filter;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

@Data
public class CoreFilterAssignAbstract {
    private String registerKey;
    private CoreAllElementDTO coreAllElementDTO;
}

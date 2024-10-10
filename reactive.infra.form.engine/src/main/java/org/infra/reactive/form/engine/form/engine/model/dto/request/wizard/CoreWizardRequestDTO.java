package org.infra.reactive.form.engine.form.engine.model.dto.request.wizard;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
public class CoreWizardRequestDTO implements Serializable {
    private CoreAllElementDTO coreAllElementDTO;
    private long recordId;
    private String registerKey;
}

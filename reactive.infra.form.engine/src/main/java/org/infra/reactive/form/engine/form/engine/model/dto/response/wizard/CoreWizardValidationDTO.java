package org.infra.reactive.form.engine.form.engine.model.dto.response.wizard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWizardValidationDTO implements Serializable {
    private long id;
    private String name;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private String registerKey;
    private boolean active;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.wizard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWizardStateValueDTO implements Serializable {
    private long id;
    private long coreWizardStateId;
    private String jsonValue;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.wizard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWizardDTO implements Serializable {
    private long id;
    private String name;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private Map<Long, CoreWizardStateDTO> coreWizardStateDTOMap;
}

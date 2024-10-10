package org.infra.reactive.form.engine.form.engine.model.dto.response.view;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
public class CoreViewModuleAssignElementDTO implements Serializable {
    private Long id;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private CoreViewModuleDTO coreViewModuleDTO;
}

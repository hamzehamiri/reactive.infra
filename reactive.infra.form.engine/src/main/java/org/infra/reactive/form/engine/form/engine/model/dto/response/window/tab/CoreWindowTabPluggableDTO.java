package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.view.CoreViewModuleDTO;

import java.io.Serializable;

@Data
public class CoreWindowTabPluggableDTO implements Serializable {
    private Long id;
    private String name;
    private String registerKey;
    private CoreViewModuleDTO coreViewModuleDTO;
}

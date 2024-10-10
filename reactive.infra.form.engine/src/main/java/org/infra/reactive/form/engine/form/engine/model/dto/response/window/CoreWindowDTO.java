package org.infra.reactive.form.engine.form.engine.model.dto.response.window;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.CoreWindowProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.view.CoreViewModuleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWindowDTO implements Serializable {
    private Long id;
    private String name;
    private String translate;
    private Map<Long, CoreWindowTabDTO> coreWindowTabDTOMap;
    private CoreWindowProfileDTO coreWindowProfileDTO;
    private CoreViewModuleDTO coreViewModuleDTO;
}

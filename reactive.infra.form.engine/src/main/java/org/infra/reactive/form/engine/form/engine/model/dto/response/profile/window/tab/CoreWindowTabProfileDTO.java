package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.table.CoreWindowTabColumnProfileDTO;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWindowTabProfileDTO {
    private long tabId;
    private int tabIndex;
    private Map<Long, CoreWindowTabColumnProfileDTO> coreWindowTabColumnProfileMap;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.CoreWindowTabProfileDTO;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreWindowProfileDTO {
    private long id;
    private String name;
    private long coreProfileId;
    private long windowId;
    private Map<Long, CoreWindowTabProfileDTO> coreWindowTabProfileDTOMap;
}

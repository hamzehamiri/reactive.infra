package org.infra.reactive.form.engine.form.engine.model.dto.response.profile;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;

import java.io.Serializable;

@Data
public class CoreUserTenantProfileDTO implements Serializable {
    private Long id;
    private String name;
    private CoreUserTenantDTO coreUserTenantDTO;
    private CoreProfileDTO coreProfileDTO;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private String jsonValue;
}

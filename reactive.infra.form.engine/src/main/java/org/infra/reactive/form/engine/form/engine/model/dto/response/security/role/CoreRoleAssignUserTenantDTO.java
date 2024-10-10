package org.infra.reactive.form.engine.form.engine.model.dto.response.security.role;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;

import java.io.Serializable;

@Data
public class CoreRoleAssignUserTenantDTO implements Serializable {
    private Long id;
    private CoreRoleDTO coreRoleMetaDataDTO;
    private CoreUserTenantDTO coreUserTenantDTO;
    private boolean active;
}

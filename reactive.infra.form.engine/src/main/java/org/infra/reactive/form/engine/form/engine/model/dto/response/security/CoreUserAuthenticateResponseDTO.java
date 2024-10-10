package org.infra.reactive.form.engine.form.engine.model.dto.response.security;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.role.CoreRoleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;

import java.io.Serializable;
import java.util.List;

@Data
public class CoreUserAuthenticateResponseDTO implements Serializable {
    private String token;
    private List<CoreUserTenantDTO> allTenants;
    private List<CoreRoleDTO> allRoles;
}

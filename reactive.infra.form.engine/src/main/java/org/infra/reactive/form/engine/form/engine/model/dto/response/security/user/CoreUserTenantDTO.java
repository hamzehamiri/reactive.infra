package org.infra.reactive.form.engine.form.engine.model.dto.response.security.user;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant.CoreTenantDTO;

import java.io.Serializable;

@Data
public class CoreUserTenantDTO implements Serializable {
    private Long id;
    private CoreUserDTO coreUserDTO;
    private CoreTenantDTO coreTenantDTO;
    private boolean active;
    private String password;
}

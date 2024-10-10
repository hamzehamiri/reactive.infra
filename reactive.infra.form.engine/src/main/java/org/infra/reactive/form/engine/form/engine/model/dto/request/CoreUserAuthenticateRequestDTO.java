package org.infra.reactive.form.engine.form.engine.model.dto.request;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.role.CoreRoleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;
import java.util.List;

@Data
public class CoreUserAuthenticateRequestDTO implements Serializable {
    private String userName;
    private String password;
    private String captcha;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    private CoreUserTenantDTO tenant;
    private boolean selectedAllRoles;
    private List<CoreRoleDTO> roles;
}

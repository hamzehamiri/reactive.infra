package org.infra.reactive.form.engine.form.engine.model.dto.response.security.role;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;
import java.util.Map;

@Data
public class CoreRoleAssignElementDTO implements Serializable {
    private CoreRoleDTO coreRoleDTO;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private Map<String, Boolean> attributes;
}

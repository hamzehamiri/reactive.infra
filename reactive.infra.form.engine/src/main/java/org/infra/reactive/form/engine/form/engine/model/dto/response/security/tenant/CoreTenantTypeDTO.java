package org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreTenantTypeDTO implements Serializable {
    private Long id;
    private String name;
    private Integer levelIndex;
}

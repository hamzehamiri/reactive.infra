package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreWindowTabPluggableAssignTabDTO implements Serializable {
    private Long id;
    private Long coreWindowTabId;
    private CoreWindowTabPluggableDTO coreWindowTabPluggableDTO;
}

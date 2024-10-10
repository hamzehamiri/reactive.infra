package org.infra.reactive.form.engine.form.engine.model.dto.response.view;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreViewModuleDTO implements Serializable {
    private Long id;
    private String name;
    private String registerKey;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreWindowTabTypeDTO implements Serializable {
    private Long id;
    private String name;
    private String registerKey;
}

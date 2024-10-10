package org.infra.reactive.form.engine.form.engine.model.dto.response.profile;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreProfileDTO implements Serializable {
    private Long id;
    private String name;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.security.user;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreUserDTO implements Serializable {
    private Long id;
    private String userName;
}

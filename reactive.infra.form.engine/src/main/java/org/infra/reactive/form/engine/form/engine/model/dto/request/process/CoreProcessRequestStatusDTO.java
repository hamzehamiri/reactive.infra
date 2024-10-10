package org.infra.reactive.form.engine.form.engine.model.dto.request.process;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreProcessRequestStatusDTO implements Serializable {
    private long id;
    private String name;
}

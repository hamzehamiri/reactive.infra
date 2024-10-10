package org.infra.reactive.form.engine.form.engine.model.dto.response.workflow;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreWorkflowDTO implements Serializable {
    private long id;
    private String name;
}

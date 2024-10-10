package org.infra.reactive.form.engine.form.engine.model.dto.response.workflow;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreWorkflowActionDTO implements Serializable {
    private long id;
    private String name;
    private CoreWorkflowActionTypeDTO coreWorkflowActionTypeDTO;
    private String registerKey;
}

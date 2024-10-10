package org.infra.reactive.workflow.jboss.models.transition;

import lombok.Data;
import org.infra.reactive.workflow.jboss.models.action.WorkFlowAction;

@Data
public class WorkFlowTransition {
    private String to;
    private WorkFlowAction workFlowAction;
}

package org.infra.reactive.workflow.jboss.models.event;

import lombok.Data;
import org.infra.reactive.workflow.jboss.models.action.WorkFlowAction;

@Data
public class WorkFlowEvent {
    private WorkFlowEventType workFlowEventType;
    private WorkFlowAction workFlowAction;
}

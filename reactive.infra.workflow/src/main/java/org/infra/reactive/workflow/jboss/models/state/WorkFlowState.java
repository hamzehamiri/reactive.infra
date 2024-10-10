package org.infra.reactive.workflow.jboss.models.state;

import lombok.Data;
import org.infra.reactive.workflow.jboss.models.event.WorkFlowEvent;
import org.infra.reactive.workflow.jboss.models.event.WorkFlowEventType;
import org.infra.reactive.workflow.jboss.models.transition.WorkFlowTransition;

import java.util.List;
import java.util.Map;

@Data
public class WorkFlowState {
    private WorkFlowStateType workFlowStateType;
    private WorkFlowTransition workFlowTransition;
    private Map<WorkFlowEventType, List<WorkFlowEvent>> events;
}

package org.infra.reactive.workflow.common.event;

import lombok.Data;
import org.infra.reactive.workflow.common.context.WorkFlowContext;

@Data
public class BpmnEvent {
    private String eventName;
    private String sourceId;
    private Object source;
    private Object masterNode;
    private WorkFlowContext workFlowContext;

    public BpmnEvent() {

    }

    public BpmnEvent(String eventName, Object source) {
        this.eventName = eventName;
        this.source = source;
    }

    public BpmnEvent(final String eventName, final String sourceId, final Object source) {
        this.eventName = eventName;
        this.sourceId = sourceId;
        this.source = source;
    }

    public BpmnEvent(String eventName, String sourceId, Object source, Object masterNode, WorkFlowContext workFlowContext) {
        this.eventName = eventName;
        this.sourceId = sourceId;
        this.source = source;
        this.masterNode = masterNode;
        this.workFlowContext = workFlowContext;
    }
}

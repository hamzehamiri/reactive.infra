package org.infra.reactive.workflow.common.event;

import lombok.Data;

@Data
public class BpmnJoinEvent extends BpmnEvent{
    private Object parent;
}

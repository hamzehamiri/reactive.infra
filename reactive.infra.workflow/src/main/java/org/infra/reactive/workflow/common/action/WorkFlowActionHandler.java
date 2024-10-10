package org.infra.reactive.workflow.common.action;

import org.infra.reactive.workflow.WorkFlowExecutionContext;

public abstract class WorkFlowActionHandler {


    public abstract void execute(WorkFlowExecutionContext executionContext);
}

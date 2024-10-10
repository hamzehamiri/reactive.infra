package org.infra.reactive.workflow.common.samples;

import org.infra.reactive.workflow.WorkFlowExecutionContext;
import org.infra.reactive.workflow.common.action.WorkFlowActionHandler;

public class AfterSaveWorkFlowAction extends WorkFlowActionHandler {
    @Override
    public void execute(WorkFlowExecutionContext executionContext) {
        System.out.println("After-Save");
    }
}

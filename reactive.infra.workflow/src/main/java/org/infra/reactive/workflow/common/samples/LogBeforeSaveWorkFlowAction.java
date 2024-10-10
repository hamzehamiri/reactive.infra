package org.infra.reactive.workflow.common.samples;

import org.infra.reactive.workflow.WorkFlowExecutionContext;
import org.infra.reactive.workflow.common.action.WorkFlowActionHandler;

public class LogBeforeSaveWorkFlowAction extends WorkFlowActionHandler {
    @Override
    public void execute(WorkFlowExecutionContext executionContext) {
        System.out.println("Log-Before-Save");
    }
}

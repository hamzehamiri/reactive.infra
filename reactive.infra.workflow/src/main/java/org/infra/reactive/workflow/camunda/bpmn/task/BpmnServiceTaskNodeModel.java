package org.infra.reactive.workflow.camunda.bpmn.task;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnServiceTask, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnServiceTaskNodeModel extends BpmnBaseTaskNodeModel {
    public BpmnServiceTaskNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }

    @Override
    public void internalSignal(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel) throws WorkFlowException {
        super.internalSignal(workFlowContext, bpmnProcessNodeModel);
        System.out.println("Service Task");
    }
}

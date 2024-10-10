package org.infra.reactive.workflow.camunda.bpmn.condition;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnConditionExpression, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnConditionExpressionNodeModel extends AbstractWorkFlowScanChildNode {

    public BpmnConditionExpressionNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

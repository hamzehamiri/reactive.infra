package org.infra.reactive.workflow.camunda.bpmn.gateway;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnExclusiveGateway, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnExclusiveGatewayNodeModel extends AbstractWorkFlowScanChildNode {

    public BpmnExclusiveGatewayNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

package org.infra.reactive.workflow.camunda.bpmn.zeebe;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.zeebeAssignmentDefinition, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class ZeebeAssignmentDefinitionNodeModel extends AbstractWorkFlowScanChildNode {

    public ZeebeAssignmentDefinitionNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

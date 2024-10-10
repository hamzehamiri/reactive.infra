package org.infra.reactive.workflow.camunda.bpmn.event;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnEndEvent, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnEndEventNodeModel extends AbstractWorkFlowScanChildNode {

    public BpmnEndEventNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

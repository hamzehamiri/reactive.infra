package org.infra.reactive.workflow.camunda.diagram;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmndiBPMNShape, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmndiBPMNShape extends AbstractWorkFlowScanChildNode {
    public BpmndiBPMNShape(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

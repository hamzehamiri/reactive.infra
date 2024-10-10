package org.infra.reactive.workflow.camunda.diagram;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmndiBPMNDiagram, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmndiBPMNDiagram extends AbstractWorkFlowScanChildNode {
    public BpmndiBPMNDiagram(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

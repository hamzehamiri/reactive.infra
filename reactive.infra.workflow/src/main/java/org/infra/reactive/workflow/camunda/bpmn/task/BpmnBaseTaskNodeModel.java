package org.infra.reactive.workflow.camunda.bpmn.task;

import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.w3c.dom.Node;

public class BpmnBaseTaskNodeModel extends AbstractWorkFlowScanChildNode {
    public BpmnBaseTaskNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }
}

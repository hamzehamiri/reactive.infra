package org.infra.reactive.workflow.camunda.bpmn;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.CamundaConstantXmlTagAttributes;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnSequenceFlow, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnSequenceFlowNodeModel extends AbstractWorkFlowScanChildNode {

    public BpmnSequenceFlowNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }

    public String getSourceRef() {
        return this.attributeMap.get(CamundaConstantXmlTagAttributes.sourceRef);
    }

    public String getTargetRef() {
        return this.attributeMap.get(CamundaConstantXmlTagAttributes.targetRef);
    }
}

package org.infra.reactive.workflow.camunda.bpmn.coming;

import lombok.Getter;
import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.event.BpmnEventCommand;
import org.infra.reactive.workflow.common.event.BpmnJoinEvent;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnIncoming, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnIncomingNodeModel extends AbstractWorkFlowScanChildNode {

    @Getter
    private String id;

    public BpmnIncomingNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }

    @Override
    protected void scanChildes() {
        id = node.getTextContent();

        BpmnJoinEvent bpmnJoinEvent = new BpmnJoinEvent();
        bpmnJoinEvent.setEventName(BpmnEventCommand.inComingNode);
        bpmnJoinEvent.setSourceId(id);
        bpmnJoinEvent.setSource(this);
        bpmnJoinEvent.setParent(parent);

        fireEvent(BpmnEventCommand.inComingNode, bpmnJoinEvent);
    }

    @Override
    public void validateExecute() throws WorkFlowException {
        if (id == null) {
            throw new WorkFlowException(1, "Id is Null", this);
        }
    }
}

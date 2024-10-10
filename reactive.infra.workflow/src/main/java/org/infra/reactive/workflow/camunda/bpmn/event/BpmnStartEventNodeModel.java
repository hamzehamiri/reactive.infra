package org.infra.reactive.workflow.camunda.bpmn.event;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.bpmn.BpmnSequenceFlowNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnOutgoingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.infra.reactive.workflow.common.event.BpmnEvent;
import org.infra.reactive.workflow.common.event.BpmnEventCommand;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

import java.util.List;
import java.util.Map;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnStartEvent, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnStartEventNodeModel extends AbstractWorkFlowScanChildNode {

    public BpmnStartEventNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }

    @Override
    protected void scanChildes() {
        super.scanChildes();

        BpmnEvent bpmnEvent = new BpmnEvent();
        bpmnEvent.setEventName(BpmnEventCommand.startEventNode);
        bpmnEvent.setSource(this);

        fireEvent(BpmnEventCommand.startEventNode, bpmnEvent);
    }

    @Override
    public void internalSignal(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel) throws WorkFlowException {
        super.internalSignal(workFlowContext, bpmnProcessNodeModel);
        this.validateExecute();

        for (Map.Entry<String, List<AbstractWorkFlowScanChildNode>> stringListEntry : this.getChildNodes().entrySet()) {
            for (AbstractWorkFlowScanChildNode abstractWorkFlowScanChildNode : stringListEntry.getValue()) {
                if (abstractWorkFlowScanChildNode instanceof BpmnOutgoingNodeModel out) {
                    out.validateExecute();

                    BpmnSequenceFlowNodeModel sequence = bpmnProcessNodeModel.getSequenceBySourceRefId().get(getId());
                    sequence.nextInternalSignal(workFlowContext, bpmnProcessNodeModel);

//                    BpmnIncomingNodeModel in = bpmnProcessNodeModel.getBpmnIncomingNodeModelMap().get(out.getId());
//                    emitWithJoin(workFlowContext, bpmnProcessNodeModel, out);
                }
            }
        }
    }

    @Override
    public void validateExecute() throws WorkFlowException {
        if (getChildNodes().isEmpty()) {
            throw new WorkFlowException(1, "Empty Nodes", this);
        }
    }
}

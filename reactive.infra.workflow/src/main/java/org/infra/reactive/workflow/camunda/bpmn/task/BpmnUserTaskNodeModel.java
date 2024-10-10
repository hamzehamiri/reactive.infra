package org.infra.reactive.workflow.camunda.bpmn.task;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnIncomingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnOutgoingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.zeebe.ZeebeAssignmentDefinitionNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.zeebe.ZeebeFormDefinitionNodeModel;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.infra.reactive.workflow.common.event.BpmnEvent;
import org.infra.reactive.workflow.common.event.BpmnEventCommand;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnUserTask, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnUserTaskNodeModel extends BpmnBaseTaskNodeModel {

    private ZeebeFormDefinitionNodeModel zeebeFormDefinitionNodeModel;
    private ZeebeAssignmentDefinitionNodeModel zeebeAssignmentDefinitionNodeModel;
    private BpmnIncomingNodeModel bpmnIncomingNodeModel;
    private BpmnOutgoingNodeModel bpmnOutgoingNodeModel;

    public BpmnUserTaskNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);

        addListener(BpmnEventCommand.nodeProcessed, this::nodeProcessed);
    }

    @Override
    public void internalSignal(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel) throws WorkFlowException {
        super.internalSignal(workFlowContext, bpmnProcessNodeModel);
        if (this.zeebeFormDefinitionNodeModel != null) {
            this.zeebeFormDefinitionNodeModel.internalSignal(workFlowContext, bpmnProcessNodeModel);
        }
    }

    public void nodeProcessed(String s, BpmnEvent bpmnEvent) {
        if (bpmnEvent.getSource() instanceof ZeebeFormDefinitionNodeModel zeebeFormDefinitionNodeModel) {
            this.zeebeFormDefinitionNodeModel = zeebeFormDefinitionNodeModel;
            this.zeebeFormDefinitionNodeModel.addListener(BpmnEventCommand.nextSignal, this::nextSignal);
        } else if (bpmnEvent.getSource() instanceof ZeebeAssignmentDefinitionNodeModel zeebeAssignmentDefinitionNodeModel) {
            this.zeebeAssignmentDefinitionNodeModel = zeebeAssignmentDefinitionNodeModel;
        } else if (bpmnEvent.getSource() instanceof BpmnIncomingNodeModel bpmnIncomingNodeModel) {
            this.bpmnIncomingNodeModel = bpmnIncomingNodeModel;
        } else if (bpmnEvent.getSource() instanceof BpmnOutgoingNodeModel bpmnOutgoingNodeModel) {
            this.bpmnOutgoingNodeModel = bpmnOutgoingNodeModel;
        }
    }

    @Override
    public void nextInternalSignal(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel) {
        super.nextInternalSignal(workFlowContext, bpmnProcessNodeModel);
    }

    public void nextSignal(String s, BpmnEvent bpmnEvent) {
        if (bpmnEvent.getSource() instanceof ZeebeFormDefinitionNodeModel form) {
            if (bpmnEvent.getMasterNode() instanceof BpmnProcessNodeModel bpmnProcessNodeModel) {
//                String join = bpmnProcessNodeModel.createJoinKey(bpmnIncomingNodeModel, bpmnOutgoingNodeModel);

                
//                WorkFlowJoin workFlowJoin = bpmnProcessNodeModel.getWorkflowJoinMap().get(join);
//                if (workFlowJoin != null) {
//                    try {
//                        emitWithJoin(bpmnEvent.getWorkFlowContext(), bpmnProcessNodeModel, bpmnIncomingNodeModel, bpmnOutgoingNodeModel);
//                    } catch (WorkFlowException e) {
//                        throw new RuntimeException(e);
//                    }
//                }
            }
        }
    }
}

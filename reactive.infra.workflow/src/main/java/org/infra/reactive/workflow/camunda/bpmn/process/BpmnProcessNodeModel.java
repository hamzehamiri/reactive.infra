package org.infra.reactive.workflow.camunda.bpmn.process;

import lombok.Getter;
import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.bpmn.BpmnSequenceFlowNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnIncomingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnOutgoingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.event.BpmnStartEventNodeModel;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.WorkFlowJoin;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.infra.reactive.workflow.common.event.BpmnEventCommand;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;

@Getter
@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnProcess, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnProcessNodeModel extends AbstractWorkFlowScanChildNode {
    protected final LinkedList<BpmnStartEventNodeModel> bpmnStartEventNodeModels = new LinkedList<>();
    protected final Map<String, Map<String, AbstractWorkFlowScanChildNode>> bpmnTypeAndIdNodeModels = new HashMap<>();
    protected final Map<String, AbstractWorkFlowScanChildNode> bpmnNodesById = new HashMap<>();


    //    protected final Map<String, WorkFlowJoin> workflowJoinMap = new LinkedHashMap<>();
    protected final Map<String, WorkFlowJoin> newWorkflowJoinMap = new LinkedHashMap<>();
    protected final Map<String, BpmnOutgoingNodeModel> bpmnOutgoingNodeModelMap = new HashMap<>();
    protected final Map<String, BpmnIncomingNodeModel> bpmnIncomingNodeModelMap = new HashMap<>();
    protected final Map<String, BpmnSequenceFlowNodeModel> sequenceByJoinKeySourceAndTarget = new HashMap<>();
    protected final Map<String, BpmnSequenceFlowNodeModel> sequenceBySourceRefId = new HashMap<>();

    public BpmnProcessNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);

        addListener(BpmnEventCommand.startEventNode, (bpmnEventCommand, bpmnEvent) -> {
            if (bpmnEvent.getSource() instanceof BpmnStartEventNodeModel startEvent) {
                bpmnStartEventNodeModels.add(startEvent);
            }
        });

        addListener(BpmnEventCommand.outComingNode, (bpmnEventCommand, bpmnEvent) -> {
            if (bpmnEvent.getSource() instanceof BpmnOutgoingNodeModel out) {
                bpmnOutgoingNodeModelMap.put(bpmnEvent.getSourceId(), out);
//                BpmnIncomingNodeModel in = bpmnIncomingNodeModelMap.get(bpmnEvent.getSourceId());
//                if (in != null) {
//                    createJoin(in, out);
//                }
            }
        });

        addListener(BpmnEventCommand.inComingNode, (bpmnEventCommand, bpmnEvent) -> {
            if (bpmnEvent.getSource() instanceof BpmnIncomingNodeModel in) {
                bpmnIncomingNodeModelMap.put(bpmnEvent.getSourceId(), in);
//                BpmnOutgoingNodeModel out = bpmnOutgoingNodeModelMap.get(bpmnEvent.getSourceId());
//                if (out != null) {
//                    createJoin(in, out);
//                }
            }
        });

        addListener(BpmnEventCommand.nodeProcessed, (bpmnEventCommand, bpmnEvent) -> {
            if (bpmnEvent.getSource() instanceof AbstractWorkFlowScanChildNode nodeModel) {
                if (nodeModel instanceof BpmnSequenceFlowNodeModel sequence) {
                    sequenceByJoinKeySourceAndTarget.put(createJoinSequenceKey(sequence), sequence);
                    sequenceBySourceRefId.put(sequence.getSourceRef(), sequence);
                } else {
                    WorkflowNodeReaderRegistry workflowNodeReaderRegistry = nodeModel.getClass().getAnnotation(WorkflowNodeReaderRegistry.class);

                    Map<String, AbstractWorkFlowScanChildNode> idbpmnMap = bpmnTypeAndIdNodeModels.computeIfAbsent(workflowNodeReaderRegistry.registerKey(), s -> new HashMap<>());
                    if (nodeModel.getId() != null) {
                        idbpmnMap.put(nodeModel.getId(), nodeModel);

                        bpmnNodesById.put(nodeModel.getId(), nodeModel);
                    }
                }
            }
        });
    }

    @Override
    protected void scanSequenceFlow() {
        sequenceByJoinKeySourceAndTarget.forEach((joinKey, bpmnSequenceFlowNodeModel) -> {
            AbstractWorkFlowScanChildNode source = bpmnNodesById.get(bpmnSequenceFlowNodeModel.getSourceRef());
            AbstractWorkFlowScanChildNode target = bpmnNodesById.get(bpmnSequenceFlowNodeModel.getTargetRef());

            newWorkflowJoinMap.put(joinKey, createWorkFlowJoin(source, target));
        });
    }

    public void nextSignal(WorkFlowContext workFlowContext, AbstractWorkFlowScanChildNode currentNode) {
        currentNode.nextInternalSignal(workFlowContext, this);
    }

    public void signal(WorkFlowContext workFlowContext, AbstractWorkFlowScanChildNode currentNode) throws WorkFlowException {
        if (currentNode != null) {
            if (currentNode instanceof BpmnStartEventNodeModel startEvent) {
                startEvent.internalSignal(workFlowContext, this);
            } else {
                currentNode.internalSignal(workFlowContext, this);
            }
        } else {
            if (!bpmnStartEventNodeModels.isEmpty()) {
                for (BpmnStartEventNodeModel startEvent : bpmnStartEventNodeModels) {
                    startEvent.internalSignal(workFlowContext, this);
                }
            }
        }
    }

//    protected void createJoin(AbstractWorkFlowScanChildNode in, AbstractWorkFlowScanChildNode out) {
//        workflowJoinMap.put(createJoinKey(in, out), createWorkFlowJoin(in, out));
//    }

    protected WorkFlowJoin createWorkFlowJoin(AbstractWorkFlowScanChildNode in, AbstractWorkFlowScanChildNode out) {
        WorkFlowJoin workflowJoin = new WorkFlowJoin();
        workflowJoin.setIn(in.getParent());
        workflowJoin.setOut(out.getParent());
        return workflowJoin;
    }

    protected String createJoinSequenceKey(BpmnSequenceFlowNodeModel sequence) {
        return String.join("|", sequence.getSourceRef(), sequence.getTargetRef());
    }

    public String createJoinKey(AbstractWorkFlowScanChildNode in, AbstractWorkFlowScanChildNode out) {
        return String.join("|", in.getId(), out.getId());
    }

    public AbstractWorkFlowScanChildNode findByTypeAndId(String type, String id) {
        Map<String, AbstractWorkFlowScanChildNode> nodesIdMap = bpmnTypeAndIdNodeModels.get(type);
        if (nodesIdMap != null) {
            return nodesIdMap.get(id);
        }
        return null;
    }
}

package org.infra.reactive.workflow.camunda.bpmn;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderEngineEnum;
import org.infra.reactive.workflow.common.registernode.WorkflowNodeReaderRegistry;
import org.w3c.dom.Node;

import java.util.List;
import java.util.Map;

@WorkflowNodeReaderRegistry(registerKey = CamundaConstantXmlTag.bpmnDefinition, workFlowType = WorkflowNodeReaderEngineEnum.Camunda)
public class BpmnDefinitionsNodeModel extends AbstractWorkFlowScanChildNode {

    public BpmnDefinitionsNodeModel(AbstractWorkFlowScanChildNode parent, Node node) {
        super(parent, node);
    }

    public void signal(WorkFlowContext workFlowContext) throws WorkFlowException {
        signal(workFlowContext, null);
    }

    public void signal(WorkFlowContext workFlowContext, AbstractWorkFlowScanChildNode currentNode) throws WorkFlowException {
        for (Map.Entry<String, List<AbstractWorkFlowScanChildNode>> stringListEntry : getChildNodes().entrySet()) {
            for (AbstractWorkFlowScanChildNode abstractWorkFlowScanChildNode : stringListEntry.getValue()) {
                if (abstractWorkFlowScanChildNode instanceof BpmnProcessNodeModel bpmnProcessNodeModel) {
                    bpmnProcessNodeModel.signal(workFlowContext, currentNode);
                }
            }
        }
    }

    public void nextSignal(WorkFlowContext workFlowContext, AbstractWorkFlowScanChildNode currentNode) {
        for (Map.Entry<String, List<AbstractWorkFlowScanChildNode>> stringListEntry : getChildNodes().entrySet()) {
            for (AbstractWorkFlowScanChildNode abstractWorkFlowScanChildNode : stringListEntry.getValue()) {
                if (abstractWorkFlowScanChildNode instanceof BpmnProcessNodeModel bpmnProcessNodeModel) {
                    bpmnProcessNodeModel.nextSignal(workFlowContext, currentNode);
                }
            }
        }
    }
}

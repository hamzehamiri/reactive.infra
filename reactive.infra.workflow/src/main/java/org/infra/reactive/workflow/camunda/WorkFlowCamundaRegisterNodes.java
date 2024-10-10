package org.infra.reactive.workflow.camunda;

import org.infra.reactive.workflow.camunda.bpmn.*;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnIncomingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.coming.BpmnOutgoingNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.condition.BpmnConditionExpressionNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.event.BpmnEndEventNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.event.BpmnStartEventNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.gateway.BpmnExclusiveGatewayNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.task.BpmnServiceTaskNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.task.BpmnUserTaskNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.zeebe.ZeebeAssignmentDefinitionNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.zeebe.ZeebeFormDefinitionNodeModel;
import org.infra.reactive.workflow.camunda.diagram.*;
import org.infra.reactive.workflow.common.WorkFlowRegistryNodeFactory;

public class WorkFlowCamundaRegisterNodes {
    public static void registryNodes() {
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnDefinition, BpmnDefinitionsNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnProcess, BpmnProcessNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnStartEvent, BpmnStartEventNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnSequenceFlow, BpmnSequenceFlowNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnIncoming, BpmnIncomingNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnOutgoing, BpmnOutgoingNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnUserTask, BpmnUserTaskNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnServiceTask, BpmnServiceTaskNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnExtensionElements, BpmnExtensionElementsNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.zeebeAssignmentDefinition, ZeebeAssignmentDefinitionNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.zeebeFormDefinition, ZeebeFormDefinitionNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnEndEvent, BpmnEndEventNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnExclusiveGateway, BpmnExclusiveGatewayNodeModel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmnConditionExpression, BpmnConditionExpressionNodeModel.class);

        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmndiBPMNDiagram, BpmndiBPMNDiagram.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmndiBPMNPlane, BpmndiBPMNPlane.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmndiBPMNShape, BpmndiBPMNShape.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.dcBounds, DcBounds.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmndiBPMNLabel, BpmndiBPMNLabel.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.bpmndiBPMNEdge, BpmndiBPMNEdge.class);
        WorkFlowRegistryNodeFactory.Instance().register(CamundaConstantXmlTag.diWaypoint, DiWaypoint.class);
    }
}

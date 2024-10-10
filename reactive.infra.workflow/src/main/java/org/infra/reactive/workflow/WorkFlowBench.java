package org.infra.reactive.workflow;

import org.infra.reactive.workflow.camunda.CamundaConstantXmlTag;
import org.infra.reactive.workflow.camunda.WorkFlowCamundaRegisterNodes;
import org.infra.reactive.workflow.camunda.bpmn.BpmnDefinitionsNodeModel;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;
import org.infra.reactive.workflow.common.WorkFlowRegistryNodeFactory;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;

public class WorkFlowBench {
    public static void main(String[] args) {
        String xmlWorkFlow = "<process-definition name=\"processDef1\">\n" +
                "    <start-state>\n" +
                "        <transition name=\"transitionFirst\" to=\"before-save\"/>\n" +
                "    </start-state>\n" +
                "    <task-node name=\"before-save\">\n" +
                "        <task name=\"change\">\n" +
                "            <assignment class='org.hamzeh.erp.workflow.samples.BeforeSaveWorkFlowAction' />\n" +
                "        </task>\n" +
                "        <transition to='end' />\"\n" +
                "    </task-node>\n" +
                "</process-definition>";

        String xmlWorkFlow2 = "<process-definition>\n" +
                "    <start-state>\n" +
                "        <transition to=\"auction\"/>\n" +
                "    </start-state>\n" +
                "    <state name=\"auction\">\n" +
                "        <transition name=\"auction ends\" to=\"salefork\"/>\n" +
                "        <transition name=\"cancel\" to=\"end\"/>\n" +
                "    </state>\n" +
                "    <fork name=\"salefork\">\n" +
                "        <transition name=\"shipping\" to=\"send item\"/>\n" +
                "        <transition name=\"billing\" to=\"receive money\"/>\n" +
                "    </fork>\n" +
                "    <state name=\"send item\">\n" +
                "        <transition to=\"receive item\"/>\n" +
                "    </state>\n" +
                "    <state name=\"receive item\">\n" +
                "        <transition to=\"salejoin\"/>\n" +
                "    </state>\n" +
                "    <state name=\"receive money\">\n" +
                "        <transition to=\"send money\"/>\n" +
                "    </state>\n" +
                "    <state name=\"send money\">\n" +
                "        <transition to=\"salejoin\"/>\n" +
                "    </state>\n" +
                "    <join name=\"salejoin\">\n" +
                "        <transition to=\"end\"/>\n" +
                "    </join>\n" +
                "    <end-state name=\"end\"/>\n" +
                "</process-definition>";

        String xmlSaveWorkFlow = "<process-definition>\n" +
                "    <start-state>\n" +
                "        <transition to=\"before-save\"/>\n" +
                "    </start-state>\n" +
                "    <state name=\"before-save\">\n" +
                "        <transition to=\"save\">\n" +
                "            <action class='org.hamzeh.erp.workflow.samples.BeforeSaveWorkFlowAction'/>\n" +
                "        </transition>\n" +
                "        <event type='node-enter'>\n" +
                "            <action class='org.hamzeh.erp.workflow.samples.LogBeforeSaveWorkFlowAction'/>\n" +
                "        </event>\n" +
                "        <event type='node-leave'>\n" +
                "            <action class='org.hamzeh.erp.workflow.samples.LogBeforeSaveWorkFlowAction'/>\n" +
                "        </event>\n" +
                "    </state>\n" +
                "    <state name=\"save\">\n" +
                "        <transition to=\"after-save\">\n" +
                "            <action class='org.hamzeh.erp.workflow.samples.SaveWorkFlowAction'/>\n" +
                "        </transition>\n" +
                "    </state>\n" +
                "    <state name=\"after-save\">\n" +
                "        <transition to=\"end\">\n" +
                "            <action class='org.hamzeh.erp.workflow.samples.AfterSaveWorkFlowAction'/>\n" +
                "        </transition>\n" +
                "    </state>\n" +
                "    <end-state name=\"end\"/>\n" +
                "</process-definition>";

        String xmlWorkflowMorakhasi = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:zeebe=\"http://camunda.org/schema/zeebe/1.0\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:modeler=\"http://camunda.org/schema/modeler/1.0\" id=\"Definitions_1vhu39g\" targetNamespace=\"http://bpmn.io/schema/bpmn\" exporter=\"Camunda Modeler\" exporterVersion=\"5.24.0\" modeler:executionPlatform=\"Camunda Cloud\" modeler:executionPlatformVersion=\"8.5.0\">\n" +
                "  <bpmn:process id=\"Morakhasi\" name=\"Morakhasi\" isExecutable=\"true\">\n" +
                "    <bpmn:startEvent id=\"StartEvent_1\">\n" +
                "      <bpmn:outgoing>Flow_1gdhc82</bpmn:outgoing>\n" +
                "    </bpmn:startEvent>\n" +
                "    <bpmn:sequenceFlow id=\"Flow_1gdhc82\" sourceRef=\"StartEvent_1\" targetRef=\"Task\" />\n" +
                "    <bpmn:userTask id=\"Task\" name=\"فرآیند مرخصی\">\n" +
                "      <bpmn:extensionElements>\n" +
                "        <zeebe:assignmentDefinition assignee=\"demo\" />\n" +
                "        <zeebe:formDefinition formId=\"user-register\" />\n" +
                "      </bpmn:extensionElements>\n" +
                "      <bpmn:incoming>Flow_1gdhc82</bpmn:incoming>\n" +
                "      <bpmn:outgoing>Flow_1cqb2za</bpmn:outgoing>\n" +
                "    </bpmn:userTask>\n" +
                "    <bpmn:endEvent id=\"Event_1d3539i\">\n" +
                "      <bpmn:incoming>Flow_026kajc</bpmn:incoming>\n" +
                "    </bpmn:endEvent>\n" +
                "    <bpmn:sequenceFlow id=\"Flow_026kajc\" sourceRef=\"Activity_0zrbksw\" targetRef=\"Event_1d3539i\" />\n" +
                "    <bpmn:endEvent id=\"Event_1gpio0n\">\n" +
                "      <bpmn:incoming>Flow_1alghes</bpmn:incoming>\n" +
                "    </bpmn:endEvent>\n" +
                "    <bpmn:sequenceFlow id=\"Flow_1alghes\" sourceRef=\"Activity_12r2ti2\" targetRef=\"Event_1gpio0n\" />\n" +
                "    <bpmn:userTask id=\"Activity_0zrbksw\" name=\"مسئول تایید\">\n" +
                "      <bpmn:extensionElements>\n" +
                "        <zeebe:formDefinition formId=\"Form_1v72zex\" />\n" +
                "        <zeebe:assignmentDefinition assignee=\"demo\" />\n" +
                "      </bpmn:extensionElements>\n" +
                "      <bpmn:incoming>Flow_1daya9l</bpmn:incoming>\n" +
                "      <bpmn:outgoing>Flow_026kajc</bpmn:outgoing>\n" +
                "    </bpmn:userTask>\n" +
                "    <bpmn:userTask id=\"Activity_12r2ti2\" name=\"مسئول تایید\">\n" +
                "      <bpmn:extensionElements>\n" +
                "        <zeebe:formDefinition formId=\"Form_1v72zex\" />\n" +
                "        <zeebe:assignmentDefinition assignee=\"demo\" />\n" +
                "      </bpmn:extensionElements>\n" +
                "      <bpmn:incoming>Flow_1g310zh</bpmn:incoming>\n" +
                "      <bpmn:outgoing>Flow_1alghes</bpmn:outgoing>\n" +
                "    </bpmn:userTask>\n" +
                "    <bpmn:exclusiveGateway id=\"Gateway_0nv1uvx\">\n" +
                "      <bpmn:incoming>Flow_1cqb2za</bpmn:incoming>\n" +
                "      <bpmn:outgoing>Flow_1g310zh</bpmn:outgoing>\n" +
                "      <bpmn:outgoing>Flow_1daya9l</bpmn:outgoing>\n" +
                "    </bpmn:exclusiveGateway>\n" +
                "    <bpmn:sequenceFlow id=\"Flow_1g310zh\" name=\"مرخصی ساعتی\" sourceRef=\"Gateway_0nv1uvx\" targetRef=\"Activity_12r2ti2\">\n" +
                "      <bpmn:conditionExpression xsi:type=\"bpmn:tFormalExpression\">=noe_morakhasi=\"h\"</bpmn:conditionExpression>\n" +
                "    </bpmn:sequenceFlow>\n" +
                "    <bpmn:sequenceFlow id=\"Flow_1daya9l\" name=\"بررسی مرخصی طولانی\" sourceRef=\"Gateway_0nv1uvx\" targetRef=\"Activity_0zrbksw\">\n" +
                "      <bpmn:conditionExpression xsi:type=\"bpmn:tFormalExpression\">=noe_morakhasi=\"d\"</bpmn:conditionExpression>\n" +
                "    </bpmn:sequenceFlow>\n" +
                "    <bpmn:sequenceFlow id=\"Flow_1cqb2za\" sourceRef=\"Task\" targetRef=\"Gateway_0nv1uvx\" />\n" +
                "  </bpmn:process>\n" +
                "  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n" +
                "    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Morakhasi\">\n" +
                "      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n" +
                "        <dc:Bounds x=\"179\" y=\"199\" width=\"36\" height=\"36\" />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNShape id=\"Activity_1i9ieas_di\" bpmnElement=\"Task\">\n" +
                "        <dc:Bounds x=\"282\" y=\"177\" width=\"100\" height=\"80\" />\n" +
                "        <bpmndi:BPMNLabel />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNShape id=\"Gateway_0nv1uvx_di\" bpmnElement=\"Gateway_0nv1uvx\" isMarkerVisible=\"true\">\n" +
                "        <dc:Bounds x=\"445\" y=\"192\" width=\"50\" height=\"50\" />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNShape id=\"Event_1d3539i_di\" bpmnElement=\"Event_1d3539i\">\n" +
                "        <dc:Bounds x=\"812\" y=\"102\" width=\"36\" height=\"36\" />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNShape id=\"Event_1gpio0n_di\" bpmnElement=\"Event_1gpio0n\">\n" +
                "        <dc:Bounds x=\"812\" y=\"312\" width=\"36\" height=\"36\" />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNShape id=\"Activity_1qjp9ef_di\" bpmnElement=\"Activity_0zrbksw\">\n" +
                "        <dc:Bounds x=\"600\" y=\"80\" width=\"100\" height=\"80\" />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNShape id=\"Activity_1hxrhqq_di\" bpmnElement=\"Activity_12r2ti2\">\n" +
                "        <dc:Bounds x=\"600\" y=\"290\" width=\"100\" height=\"80\" />\n" +
                "      </bpmndi:BPMNShape>\n" +
                "      <bpmndi:BPMNEdge id=\"Flow_1gdhc82_di\" bpmnElement=\"Flow_1gdhc82\">\n" +
                "        <di:waypoint x=\"215\" y=\"217\" />\n" +
                "        <di:waypoint x=\"282\" y=\"217\" />\n" +
                "      </bpmndi:BPMNEdge>\n" +
                "      <bpmndi:BPMNEdge id=\"Flow_1cqb2za_di\" bpmnElement=\"Flow_1cqb2za\">\n" +
                "        <di:waypoint x=\"382\" y=\"217\" />\n" +
                "        <di:waypoint x=\"445\" y=\"217\" />\n" +
                "      </bpmndi:BPMNEdge>\n" +
                "      <bpmndi:BPMNEdge id=\"Flow_1daya9l_di\" bpmnElement=\"Flow_1daya9l\">\n" +
                "        <di:waypoint x=\"470\" y=\"192\" />\n" +
                "        <di:waypoint x=\"470\" y=\"120\" />\n" +
                "        <di:waypoint x=\"600\" y=\"120\" />\n" +
                "        <bpmndi:BPMNLabel>\n" +
                "          <dc:Bounds x=\"425\" y=\"143\" width=\"89\" height=\"14\" />\n" +
                "        </bpmndi:BPMNLabel>\n" +
                "      </bpmndi:BPMNEdge>\n" +
                "      <bpmndi:BPMNEdge id=\"Flow_1g310zh_di\" bpmnElement=\"Flow_1g310zh\">\n" +
                "        <di:waypoint x=\"470\" y=\"242\" />\n" +
                "        <di:waypoint x=\"470\" y=\"330\" />\n" +
                "        <di:waypoint x=\"600\" y=\"330\" />\n" +
                "        <bpmndi:BPMNLabel>\n" +
                "          <dc:Bounds x=\"441\" y=\"273\" width=\"58\" height=\"14\" />\n" +
                "        </bpmndi:BPMNLabel>\n" +
                "      </bpmndi:BPMNEdge>\n" +
                "      <bpmndi:BPMNEdge id=\"Flow_026kajc_di\" bpmnElement=\"Flow_026kajc\">\n" +
                "        <di:waypoint x=\"700\" y=\"120\" />\n" +
                "        <di:waypoint x=\"812\" y=\"120\" />\n" +
                "      </bpmndi:BPMNEdge>\n" +
                "      <bpmndi:BPMNEdge id=\"Flow_1alghes_di\" bpmnElement=\"Flow_1alghes\">\n" +
                "        <di:waypoint x=\"700\" y=\"330\" />\n" +
                "        <di:waypoint x=\"812\" y=\"330\" />\n" +
                "      </bpmndi:BPMNEdge>\n" +
                "    </bpmndi:BPMNPlane>\n" +
                "  </bpmndi:BPMNDiagram>\n" +
                "</bpmn:definitions>\n";

        try {
//            WorkFlowProcessDefinition process = WorkFlowProcessDefinition.parseXmlString(xmlWorkflowMorakhasi);
//            process.signal();

            WorkFlowCamundaRegisterNodes.registryNodes();

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new ByteArrayInputStream(xmlWorkflowMorakhasi.getBytes()));

            NodeList nList = document.getChildNodes();
            Node nNode = nList.item(0);

            BpmnDefinitionsNodeModel nodeModelScan = WorkFlowRegistryNodeFactory.Instance().factoryInstance(nNode.getNodeName(), null, nNode);
            nodeModelScan.scanDeep();
            nodeModelScan.signal(new WorkFlowContext());

            AbstractWorkFlowScanChildNode taskNodeForm = ((BpmnProcessNodeModel) nodeModelScan.getChildNodes().get(CamundaConstantXmlTag.bpmnProcess).getFirst()).findByTypeAndId(CamundaConstantXmlTag.zeebeFormDefinition, "user-register");
            if (taskNodeForm != null) {
                nodeModelScan.nextSignal(new WorkFlowContext(), taskNodeForm);
            }

            System.out.println("Finish Scan");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

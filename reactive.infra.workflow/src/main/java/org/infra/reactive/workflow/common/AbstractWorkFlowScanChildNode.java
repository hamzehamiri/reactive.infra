package org.infra.reactive.workflow.common;

import lombok.Getter;
import org.infra.reactive.form.engine.form.engine.providers.common.AbstractListener;
import org.infra.reactive.workflow.camunda.CamundaConstantXmlTagAttributes;
import org.infra.reactive.workflow.camunda.bpmn.process.BpmnProcessNodeModel;
import org.infra.reactive.workflow.common.context.WorkFlowContext;
import org.infra.reactive.workflow.common.event.BpmnEvent;
import org.infra.reactive.workflow.common.event.BpmnEventCommand;
import org.infra.reactive.workflow.common.exception.WorkFlowException;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class AbstractWorkFlowScanChildNode extends AbstractListener<String, BpmnEvent> {
    @Getter
    protected final Map<String, List<AbstractWorkFlowScanChildNode>> childNodes = new HashMap<>();
    protected final Map<String, String> attributeMap = new HashMap<>();
    @Getter
    protected AbstractWorkFlowScanChildNode parent;
    protected Node node;

    public AbstractWorkFlowScanChildNode(AbstractWorkFlowScanChildNode parent, Node node) {
        this.parent = parent;
        this.node = node;
    }

    public void scanDeep() {
        scanAttribute();
        scanChildes();
        scanSequenceFlow();
    }

    protected void scanAttribute() {
        NamedNodeMap nNodeAttributes = node.getAttributes();
        for (int indexAttribute = 0; indexAttribute < nNodeAttributes.getLength(); indexAttribute++) {
            Node nodeAttrib = nNodeAttributes.item(indexAttribute);
            if (nodeAttrib.getNodeType() == Node.ATTRIBUTE_NODE) {
                attributeMap.put(nodeAttrib.getNodeName(), nodeAttrib.getNodeValue());
            }
        }
    }

    protected void scanChildes() {
        for (int childIndex = 0; childIndex < node.getChildNodes().getLength(); childIndex++) {
            Node nodeChild = node.getChildNodes().item(childIndex);

            if (nodeChild.getNodeType() == Node.ELEMENT_NODE) {
                List<AbstractWorkFlowScanChildNode> childList = childNodes.computeIfAbsent(nodeChild.getNodeName(), k -> new ArrayList<>());

                AbstractWorkFlowScanChildNode nodeModel = factoryInstance(nodeChild.getNodeName(), this, nodeChild);
                fireEvent(BpmnEventCommand.nodeProcessed, new BpmnEvent(BpmnEventCommand.nodeProcessed, nodeModel) , true);

                childList.add(nodeModel);
            }
        }
    }

    protected void scanSequenceFlow() {

    }

    @Override
    public void fireEvent(String queryEvent, BpmnEvent queryEventSourceData) {
        this.fireEvent(queryEvent, queryEventSourceData , true);
    }

    public void fireEvent(String queryEvent, BpmnEvent queryEventSourceData, boolean fireParent) {
        super.fireEvent(queryEvent, queryEventSourceData);
        if (parent != null && fireParent)
            parent.fireEvent(queryEvent, queryEventSourceData);
    }

    public String getId() {
        return attributeMap.get(CamundaConstantXmlTagAttributes.id);
    }

    protected AbstractWorkFlowScanChildNode factoryInstance(String registerKey, AbstractWorkFlowScanChildNode parent, Node node) {
        AbstractWorkFlowScanChildNode nodeModelScan = WorkFlowRegistryNodeFactory.Instance().factoryInstance(registerKey, parent, node);
        nodeModelScan.scanDeep();
        return nodeModelScan;
    }

    public void internalSignal(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel) throws WorkFlowException {

    }

    public void nextInternalSignal(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel) {
        BpmnEvent bpmnEvent = new BpmnEvent();
        bpmnEvent.setEventName(BpmnEventCommand.nextSignal);
        bpmnEvent.setSource(this);
        bpmnEvent.setMasterNode(bpmnProcessNodeModel);
        bpmnEvent.setWorkFlowContext(workFlowContext);

        fireEvent(BpmnEventCommand.nextSignal, bpmnEvent);
    }

    public void validateExecute() throws WorkFlowException {

    }

//    public void emitWithJoin(WorkFlowContext workFlowContext, BpmnProcessNodeModel bpmnProcessNodeModel , AbstractWorkFlowScanChildNode source) throws WorkFlowException {
////        WorkFlowJoin join = bpmnProcessNodeModel.getWorkflowJoinMap().get(bpmnProcessNodeModel.createJoinKey(in, out));
////        if (join != null) {
////            join.getIn().internalSignal(workFlowContext, bpmnProcessNodeModel);
////        }
//    }
}

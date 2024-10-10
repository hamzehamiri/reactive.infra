package org.infra.reactive.workflow.common;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.ByteArrayInputStream;

public class WorkFlowProcessDefinition {
    private String xml;
    private XMLInputFactory inputFactory;

    public WorkFlowProcessDefinition() {
        this.inputFactory = XMLInputFactory.newInstance();
    }

    public void parseXml(String xml) throws XMLStreamException {
        this.xml = xml;
        XMLStreamReader reader = this.inputFactory.createXMLStreamReader(new ByteArrayInputStream(xml.getBytes()));
        while (reader.hasNext()) {
            int event = reader.next();

            switch (event) {
                case XMLStreamConstants.START_ELEMENT:
                    System.out.println("Start Element: " + reader.getLocalName());
                    for (int i = 0; i < reader.getAttributeCount(); i++) {
                        System.out.println("Attribute: " + reader.getAttributeLocalName(i) + " = " + reader.getAttributeValue(i));
                    }
                    break;

                case XMLStreamConstants.CHARACTERS:
                    if (reader.isWhiteSpace()) break;
                    System.out.println("Text: " + reader.getText().trim());
                    break;

                case XMLStreamConstants.END_ELEMENT:
                    System.out.println("End Element: " + reader.getLocalName());
                    break;
            }
        }
    }

    public void signal() {

    }

    public static WorkFlowProcessDefinition parseXmlString(String xml) throws XMLStreamException {
        WorkFlowProcessDefinition processDefinition = new WorkFlowProcessDefinition();
        processDefinition.parseXml(xml);
        return processDefinition;
    }
}

package org.infra.reactive.form.engine.query.xmlreader;

import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.DocumentTraversal;
import org.w3c.dom.traversal.NodeFilter;
import org.w3c.dom.traversal.NodeIterator;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class XmlReaderDocumentFactory {
    private static Map<Class<? extends XmlInterfaceField>, Map<String, Class<?>>> tagNameAndClass = new HashMap<>();
    private Map<Class<?>, ReflectionMetaData> classReflectionMetaDataMap = new HashMap<>();
    private DocumentBuilder builder;

    private static List<Class<?>> primitiveTypes = new ArrayList<>();

    static {
        primitiveTypes.add(int.class);
        primitiveTypes.add(Integer.class);
        primitiveTypes.add(long.class);
        primitiveTypes.add(Long.class);
        primitiveTypes.add(float.class);
        primitiveTypes.add(Float.class);
        primitiveTypes.add(double.class);
        primitiveTypes.add(Double.class);
        primitiveTypes.add(boolean.class);
        primitiveTypes.add(Boolean.class);
        primitiveTypes.add(char.class);
        primitiveTypes.add(Character.class);
        primitiveTypes.add(String.class);
        primitiveTypes.add(byte.class);
        primitiveTypes.add(Byte.class);
        primitiveTypes.add(short.class);
        primitiveTypes.add(Short.class);
    }

    public static void register(Class<? extends XmlInterfaceField> fieldInterface, String tagName, Class<? extends XmlInterfaceField> classBean) {
        Map<String, Class<?>> tagImpl = tagNameAndClass.computeIfAbsent(fieldInterface, _ -> new HashMap<>());
        tagImpl.put(tagName, classBean);
    }


    public XmlReaderDocumentFactory() throws ParserConfigurationException {
        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        this.builder = dbFactory.newDocumentBuilder();
    }

    public <T> String convertBeanToString(T instanceBean) throws Exception {
        Class<?> clazz = instanceBean.getClass();
        Document doc = this.builder.newDocument();

        XmlRootElement root = clazz.getDeclaredAnnotation(XmlRootElement.class);

        Element rootNode = doc.createElement(root.name());
        doc.appendChild(rootNode);

        scanClass(instanceBean, rootNode, doc);

        return convertDocToString(doc);
    }

    public <T> T convertStringToBean(Class<T> clazz, String xml) throws Exception {
        T instance = clazz.getConstructor().newInstance();

        Document doc = builder.parse(new InputSource(new StringReader(xml)));
        DOMImplementation domImpl = builder.getDOMImplementation();
        DocumentTraversal traversableDoc = (DocumentTraversal) doc;
        NodeIterator nodeIterator = traversableDoc.createNodeIterator(doc, NodeFilter.SHOW_ALL, null, false);

        XmlRootElement rootElement = clazz.getDeclaredAnnotation(XmlRootElement.class);

        if (!domImpl.hasFeature("Traversal", "2.0")) {
            System.out.println("Traversal feature is not supported.");
        } else {
            Node node;
            boolean found = false;
            while ((node = nodeIterator.nextNode()) != null && !found) {
                if (node.getNodeType() == Node.DOCUMENT_NODE) {
                    found = true;
                }
            }
            XmlClassScanMetaModel metaData = scanClass(clazz);
            convertField(instance, clazz, nodeIterator, metaData, nodeIterator.nextNode());
        }

        return instance;
    }

    private XmlClassScanMetaModel scanClass(Class<?> clazz) {
        XmlClassScanMetaModel xmlClassScanMetaModel = new XmlClassScanMetaModel();

        while (clazz != null) {
            for (Field declaredField : clazz.getDeclaredFields()) {
                XmlElement xmlElement = declaredField.getDeclaredAnnotation(XmlElement.class);
                if (xmlElement != null) {
                    xmlClassScanMetaModel.getFieldTagNameMap().put(xmlElement.name(), declaredField);
                } else {
                    XmlAttribute xmlAttribute = declaredField.getDeclaredAnnotation(XmlAttribute.class);
                    if (xmlAttribute != null) {
                        xmlClassScanMetaModel.getFieldAttributeNameMap().put(xmlAttribute.name(), declaredField);
                    }
                }
            }
            clazz = clazz.getSuperclass();
        }


        return xmlClassScanMetaModel;
    }

    private void convertField(Object instance, Class<?> clazz, NodeIterator nodeIterator, XmlClassScanMetaModel metaData, Node node) throws Exception {
        while (node != null) {
            switch (node.getNodeType()) {
                case Node.ELEMENT_NODE -> {
                    Field field = metaData.getFieldTagNameMap().get(node.getNodeName());
                    if (field != null) {
                        field.setAccessible(true);
                        Object fieldInstance = field.get(instance);
                        if (fieldInstance == null) {
                            Class<?> fieldTypeClass = field.getType();
                            if (primitiveTypes.contains(fieldTypeClass)) {
                                fieldInstance = field.getType().getConstructor().newInstance();
                                field.set(instance, fieldInstance);
                            } else if ((fieldTypeClass == List.class || fieldTypeClass == ArrayList.class)) {
                                List<Object> objects = new ArrayList<>();
                                field.set(instance, objects);

                                boolean find = false;
                                while (!find) {
                                    if (node.getNodeType() == Node.ELEMENT_NODE) {
                                        Type type = field.getGenericType();
                                        if (type instanceof ParameterizedType parameterizedType) {
                                            if (parameterizedType.getActualTypeArguments().length > 0) {
                                                Type interfaces = parameterizedType.getActualTypeArguments()[0];
                                                if (interfaces instanceof Class<?> interfaceClass) {
                                                    Map<String, Class<?>> tagNameImplClass = tagNameAndClass.get(interfaceClass);
                                                    Class<?> impl = tagNameImplClass.get(node.getNodeName());
                                                    if (impl != null) {
                                                        fieldInstance = impl.getConstructor().newInstance();
                                                        objects.add(fieldInstance);

                                                        XmlClassScanMetaModel metaDataField = scanClass(impl);
                                                        convertField(fieldInstance, impl, nodeIterator, metaDataField, node);
                                                    }
                                                }
                                            }
                                        }
                                        find = true;
//                                        node.getAttributes()
                                    } else {
                                        node = nodeIterator.nextNode();
                                    }
                                }
                            } else if (fieldTypeClass == Map.class) {
                                Map<?, ?> mapField = new HashMap<>();
                                field.set(instance, mapField);
                            } else {
                                fieldInstance = field.getType().getConstructor().newInstance();
                                field.set(instance, fieldInstance);

                                XmlClassScanMetaModel metaDataField = scanClass(fieldTypeClass);

                                convertField(fieldInstance, fieldTypeClass, nodeIterator, metaDataField, nodeIterator.nextNode());
                            }

                        }
                        System.out.println(node.getNodeName());
                    }
                }
                case Node.ATTRIBUTE_NODE -> {
                    System.out.println(String.format(" %s : %s ", node.getNodeName(), node.getNodeValue()));
                    node = nodeIterator.nextNode();
                }
                case Node.TEXT_NODE -> {
                    System.out.println(node.getTextContent());
                    node = nodeIterator.nextNode();
                }
                default -> {
                    node = nodeIterator.nextNode();
                }
            }
//            parent = node;
        }
    }

    public String convertDocToString(Document doc) throws Exception {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
        StringWriter writer = new StringWriter();
        transformer.transform(new DOMSource(doc), new StreamResult(writer));
        return writer.toString();
    }

    private <T> void scanClass(T instanceBean, Node node, Document doc) throws IllegalAccessException {
        Class<?> clazz = instanceBean.getClass();
        if (primitiveTypes.contains(clazz)) {

        } else {
            while (clazz != null) {
                for (Field declaredField : clazz.getDeclaredFields()) {
                    if (!Modifier.isFinal(declaredField.getModifiers()) && !Modifier.isStatic(declaredField.getModifiers())) {
                        declaredField.setAccessible(true);

                        Object fieldValue = declaredField.get(instanceBean);

                        if (primitiveTypes.contains(declaredField.getType())) {
                            createElement(declaredField, node, fieldValue, doc, null);
                        } else if ((declaredField.getType() == List.class || declaredField.getType() == ArrayList.class) && fieldValue instanceof List<?> fieldValueCollection) {
                            for (Object o : fieldValueCollection) {
                                Node nodeCreated = createElement(declaredField, node, o, doc, tagNameByObject(o));
                                scanClass(o, nodeCreated, doc);
                            }
                        } else if (declaredField.getType() == Map.class && fieldValue instanceof Map<?, ?> fieldValueMap) {
                            for (Object o : fieldValueMap.entrySet()) {
                                Node nodeCreated = createElement(declaredField, node, o, doc, tagNameByObject(o));
                                scanClass(o, nodeCreated, doc);
                            }
                        } else {
                            if (fieldValue != null) {
                                Node nodeCreated = createElement(declaredField, node, fieldValue, doc, null);
                                scanClass(fieldValue, nodeCreated, doc);
                            }
                        }
                    }
                }
                clazz = clazz.getSuperclass();
            }
        }
    }

    private String tagNameByObject(Object o) {
        XmlRootElement xmlElement = o.getClass().getDeclaredAnnotation(XmlRootElement.class);
        if (xmlElement != null) {
            return xmlElement.name();
        } else {
            return o.getClass().getName();
        }
    }

    private Node createElement(Field declaredField, Node node, Object fieldValue, Document doc, String recommandTagName) {
        if (recommandTagName != null) {
            Node createNode = doc.createElement(recommandTagName);
            node.appendChild(createNode);
            return createNode;
        } else {
            XmlElement xmlElement = declaredField.getDeclaredAnnotation(XmlElement.class);
            Node createNode;
            if (xmlElement != null) {
                createNode = doc.createElement(xmlElement.name());
                node.appendChild(createNode);
            } else {
                XmlAttribute xmlAttribute = declaredField.getAnnotation(XmlAttribute.class);
                createNode = node;
                if (node instanceof Element element) {
                    if (fieldValue instanceof Integer fieldValueNumber) {
                        if (fieldValueNumber > 0) {
                            element.setAttribute(xmlAttribute.name(), fieldValueNumber.toString());
                        }
                    } else if (fieldValue instanceof Long fieldValueNumber) {
                        if (fieldValueNumber > 0) {
                            element.setAttribute(xmlAttribute.name(), fieldValueNumber.toString());
                        }
                    } else if (fieldValue instanceof String fieldValueString) {
                        if (!fieldValueString.isEmpty()) {
                            element.setAttribute(xmlAttribute.name(), fieldValueString);
                        }
                    }
                }
            }
            return createNode;
        }
    }
}

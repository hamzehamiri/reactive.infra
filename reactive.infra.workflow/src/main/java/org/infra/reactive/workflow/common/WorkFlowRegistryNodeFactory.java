package org.infra.reactive.workflow.common;

import org.w3c.dom.Node;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class WorkFlowRegistryNodeFactory {
    private static WorkFlowRegistryNodeFactory instance;

    public static WorkFlowRegistryNodeFactory Instance() {
        if (instance == null) {
            instance = new WorkFlowRegistryNodeFactory();
        }
        return instance;
    }

    private final ConcurrentMap<String, Class<? extends AbstractWorkFlowScanChildNode>> stringClassConcurrentMap = new ConcurrentHashMap<>(100);

    public void register(String registerKey, Class<? extends AbstractWorkFlowScanChildNode> abstractWorkFlowScanChildNodeClass) {
        stringClassConcurrentMap.put(registerKey, abstractWorkFlowScanChildNodeClass);
    }

    public <T extends AbstractWorkFlowScanChildNode> T factoryInstance(String registerKey, AbstractWorkFlowScanChildNode parent, Node node) {
        Class<? extends AbstractWorkFlowScanChildNode> serializerClass = stringClassConcurrentMap.get(registerKey);
        try {
            Constructor<? extends AbstractWorkFlowScanChildNode> constructor = serializerClass.getConstructor(AbstractWorkFlowScanChildNode.class, Node.class);
            T objectInstanceService = (T) constructor.newInstance(parent, node);
            return objectInstanceService;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

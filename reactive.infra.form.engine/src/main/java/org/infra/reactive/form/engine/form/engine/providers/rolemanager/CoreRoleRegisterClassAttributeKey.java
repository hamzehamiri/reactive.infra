package org.infra.reactive.form.engine.form.engine.providers.rolemanager;

import org.infra.reactive.form.engine.form.engine.providers.rolemanager.resourcetype.TabResourceTypeAttribute;
import org.infra.reactive.form.engine.form.engine.providers.rolemanager.resourcetype.WindowResourceTypeAttribute;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class CoreRoleRegisterClassAttributeKey {

    private static ConcurrentMap<String, Class<?>> attributeRegister = new ConcurrentHashMap<>(10);

    static {
        attributeRegister.put("Window", WindowResourceTypeAttribute.class);
        attributeRegister.put("Tab", TabResourceTypeAttribute.class);
    }

    public static void addRoleRegisterClassAttribute(String key, Class<?> clazz) {
        attributeRegister.put(key, clazz);
    }

    public static Class<?> getClass(String key) {
        return attributeRegister.get(key);
    }
}

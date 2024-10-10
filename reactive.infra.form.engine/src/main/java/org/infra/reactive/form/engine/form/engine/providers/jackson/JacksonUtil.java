package org.infra.reactive.form.engine.form.engine.providers.jackson;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.function.Predicate;

public class JacksonUtil {
    private static final ConcurrentMap<String, ClassMetaData> classMetaDataConcurrentMap = new ConcurrentHashMap<>(100);

    public static void startSerializer(ObjectMapper objectMapper, JsonNode node, Object instance, boolean superClass, boolean tryForDeepJsonMapping) throws JsonProcessingException, IllegalAccessException {
        ClassMetaData metaDataClassSuper = injectMetaDataClassDeep(instance, field -> !Modifier.isStatic(field.getModifiers()) && Modifier.isPrivate(field.getModifiers()));
        Iterator<Map.Entry<String, JsonNode>> it = node.fields();
        while (it.hasNext()) {
            Map.Entry<String, JsonNode> jsonRow = it.next();
            Field fieldTarget = metaDataClassSuper.getFieldMap().get(jsonRow.getKey());
            if (fieldTarget != null) {
                scanField(fieldTarget, objectMapper, node, instance);
            } else {
                System.out.println(" Field In Bean Not Found : " + jsonRow.getKey());
            }
        }
//        ClassMetaData metaDataClass = injectMetaDataClass(instance, instance.getClass().getName(), null, false);
//
//        if (tryForDeepJsonMapping) {
//            ClassMetaData metaDataClassSuper = injectMetaDataClassDeep(instance, field -> !Modifier.isStatic(field.getModifiers()) && Modifier.isPrivate(field.getModifiers()));
////            metaDataClassSuper = injectMetaDataClass(instance,
////                    instance.getClass().getSuperclass().getName(),
////                    field -> !Modifier.isStatic(field.getModifiers()) && Modifier.isPrivate(field.getModifiers()),
////                    true);
//
//            Iterator<Map.Entry<String, JsonNode>> it = node.fields();
//            while (it.hasNext()) {
//                Map.Entry<String, JsonNode> jsonRow = it.next();
//                Field fieldTarget = metaDataClassSuper.getFieldMap().get(jsonRow.getKey());
//                if (fieldTarget != null) {
//                    scanField(fieldTarget, objectMapper, node, instance);
//                } else {
//                    System.out.println(" Field In Bean Not Found : " + jsonRow.getKey());
//                }
//            }
//        } else {
//            for (Field field : metaDataClass.getFields()) {
//                scanField(field, objectMapper, node, instance);
//            }
//            if (superClass) {
//                metaDataClass = injectMetaDataClass(instance,
//                        instance.getClass().getSuperclass().getName(),
//                        field -> !Modifier.isStatic(field.getModifiers()) && Modifier.isPrivate(field.getModifiers()),
//                        true);
//                for (Field field : metaDataClass.getFields()) {
//                    scanField(field, objectMapper, node, instance);
//                }
//            }
//        }
    }

    private static ClassMetaData injectMetaDataClassDeep(Object instance, Predicate<Field> predicate) {
        Class<?> clazz = instance.getClass();
        ClassMetaData metaDataClass = classMetaDataConcurrentMap.get(clazz.getName());
        if (metaDataClass == null) {
            synchronized (JacksonUtil.class) {
                Map<String, Field> fieldMap = new HashMap<>();
                List<Field> fields = new ArrayList<>();

                metaDataClass = new ClassMetaData();
                metaDataClass.setClassName(instance.getClass().getName());

                classMetaDataConcurrentMap.put(clazz.getName(), metaDataClass);
                while (clazz != null) {

                    for (Field declaredField : clazz.getDeclaredFields()) {
                        if (predicate.test(declaredField)) {
                            fields.add(declaredField);
                            fieldMap.put(declaredField.getName(), declaredField);
                        }
                    }
                    clazz = clazz.getSuperclass();
                }

                metaDataClass.setFieldMap(fieldMap);
                metaDataClass.setFields(fields.toArray(new Field[0]));
            }
        }
        return metaDataClass;
    }

    private static ClassMetaData injectMetaDataClass(Object instance, String clazz, Predicate<Field> predicate, boolean superClass) {
        ClassMetaData metaDataClass = classMetaDataConcurrentMap.get(clazz);
        if (metaDataClass == null) {
            Field[] fields = superClass ? instance.getClass().getSuperclass().getDeclaredFields() : instance.getClass().getDeclaredFields();
            Map<String, Field> fieldMap = new HashMap<>();

            metaDataClass = new ClassMetaData();
            metaDataClass.setClassName(instance.getClass().getName());
            metaDataClass.setFieldMap(fieldMap);

            if (predicate != null) {
                List<Field> arrayListField = new ArrayList<>(fields.length);
                for (Field field : fields) {
                    if (predicate.test(field)) {
                        arrayListField.add(field);
                        fieldMap.put(field.getName(), field);
                    }
                }
                Field[] fieldArray = new Field[arrayListField.size()];
                metaDataClass.setFields(arrayListField.toArray(fieldArray));
            } else {
                for (Field field : fields) {
                    fieldMap.put(field.getName(), field);
                }
                metaDataClass.setFields(fields);
            }

            classMetaDataConcurrentMap.put(clazz, metaDataClass);
        }
        return metaDataClass;
    }

    private static void scanField(Field field, ObjectMapper objectMapper, JsonNode node, Object instance) throws JsonProcessingException, IllegalAccessException {
        JsonNode nodeValueFieldProps = node.get(field.getName());
        if (nodeValueFieldProps instanceof ArrayNode nodeArrayValueFieldProps && field.getType().equals(List.class)) {
            List<Object> arrayListInstanceField = new ArrayList<>();
            for (JsonNode nodeArrayValueFieldProp : nodeArrayValueFieldProps) {
                Class<?> genericType = (Class<?>) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
                Object fieldValueJackson = objectMapper.treeToValue(nodeArrayValueFieldProp, genericType);
                arrayListInstanceField.add(fieldValueJackson);
            }
            field.setAccessible(true);
            field.set(instance, arrayListInstanceField);
        } else if (field.getType().equals(Map.class)) {
            Map<Object, Object> instanceField = new HashMap<>();
            Iterator<Map.Entry<String, JsonNode>> iterator = nodeValueFieldProps.fields();
            Class<?> genericType = getGenericClassType(field, 1);
            while (iterator.hasNext()) {
                Map.Entry<String, JsonNode> stringJsonNodeEntry = iterator.next();
                Object value = objectMapper.treeToValue(stringJsonNodeEntry.getValue(), genericType);
                instanceField.put(stringJsonNodeEntry.getKey(), value);
            }
            field.setAccessible(true);
            field.set(instance, instanceField);
        } else {
            Object fieldValueJackson = objectMapper.treeToValue(nodeValueFieldProps, field.getType());
            field.setAccessible(true);
            field.set(instance, fieldValueJackson);
        }
    }

    private static Class<?> getGenericClassType(Field field, int index) {
        Type[] genericParam = ((ParameterizedType) field.getGenericType()).getActualTypeArguments();
        Type genericTypeIndex = genericParam[index];
        if (genericTypeIndex instanceof ParameterizedType) {
            return (Class<?>) ((ParameterizedType) genericTypeIndex).getRawType();
        } else if (genericTypeIndex instanceof Class<?>) {
            return (Class<?>) genericTypeIndex;
        }
        return null;
    }
}

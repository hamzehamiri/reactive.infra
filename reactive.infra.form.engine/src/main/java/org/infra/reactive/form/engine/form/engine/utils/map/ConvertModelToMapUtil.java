package org.infra.reactive.form.engine.form.engine.utils.map;

import org.infra.reactive.form.engine.form.engine.utils.PrimitiveClassUtil;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;

public class ConvertModelToMapUtil {

    public static <T> T convert(Class<T> clazz, Map<String, Object> objectMap) {
        try {
            Constructor<?> contractor = clazz.getConstructor();
            Object instance = contractor.newInstance();
            objectMap.forEach((key, value) -> {
                try {
                    Field field = clazz.getDeclaredField(key);
                    field.setAccessible(true);
                    if (field.getType().equals(Optional.class)) {
                        Type genericType = field.getGenericType();
                        field.set(instance, Optional.ofNullable(value));
                    } else if (PrimitiveClassUtil.isPrimitiveClass(field.getType())) {
                        // TODO Bug Fix JWT asMap   Integer -> Long
                        if (field.getType().equals(Long.class) && value instanceof Integer value2) {
                            field.set(instance, value2.longValue());
                        } else {
                            field.set(instance, value);
                        }
                    } else if (value instanceof Map valueMap) {
                        if (field.getType().equals(List.class)) {
                            List<Object> arrayListFieldValue = new ArrayList<>();
                            ParameterizedType generic = (ParameterizedType) field.getGenericType();
                            Class<?> listOfGeneric = (Class<?>) generic.getActualTypeArguments()[0];
                            for (Object keyFieldMap : valueMap.keySet()) {
                                Object val = valueMap.get(keyFieldMap);
                                Object classValue = convert(listOfGeneric, (Map) val);
                                arrayListFieldValue.add(classValue);
                            }
                            field.set(instance, arrayListFieldValue);
                        } else if (field.getType().equals(Map.class)) {
                            field.set(instance, convert(value.getClass(), valueMap));
                        } else {
                            field.set(instance, convert(field.getType(), valueMap));
                        }
                    }
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            return (T) instance;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static Map<String, Object> convert(Object instance) {
        Map<String, Object> converted = new HashMap<>();

        Class<?> clazz = instance.getClass();

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object val = field.get(instance);
                if (val instanceof Optional<?> optionalValue) {
                    Object finalValue = optionalValue.get();
                    extracted(converted, field.getName(), finalValue, field.getType(), field.getGenericType());
                } else if (val instanceof List listValue) {
                    Map<String, Object> valueMaps = new HashMap<>();
                    for (int i = 0; i < listValue.size(); i++) {
                        Object valArray = listValue.get(i);
                        extracted(valueMaps, field.getName() + "." + i, valArray, field.getType(), field.getGenericType());
                    }
                    converted.put(field.getName(), valueMaps);
                } else {
                    extracted(converted, field.getName(), val, field.getType(), field.getGenericType());
                }

            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        return converted;
    }

    private static void extracted(Map<String, Object> converted, String fieldName, Object finalValue, Class<?> clazz, Type clazzGeneric) {
        if (finalValue == null) {
            converted.put(fieldName, null);
        } else {
            if (clazzGeneric instanceof ParameterizedType genericFieldType) {
                clazz = (Class<?>) genericFieldType.getActualTypeArguments()[0];
            }
            if (PrimitiveClassUtil.isPrimitiveClass(clazz)) {
                converted.put(fieldName, finalValue);
            } else {
                converted.put(fieldName, convert(finalValue));
            }
        }
    }
}

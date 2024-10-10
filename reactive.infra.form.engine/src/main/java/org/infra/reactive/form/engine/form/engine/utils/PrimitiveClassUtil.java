package org.infra.reactive.form.engine.form.engine.utils;

import java.util.Arrays;
import java.util.List;

public class PrimitiveClassUtil {
    public static boolean isPrimitiveClass(Class clazz) {
        List<Class> clazzPrimitive = Arrays.asList(Integer.class, Long.class, Number.class, String.class, Boolean.class, boolean.class, int.class, long.class);
        return clazzPrimitive.stream().filter(aClass -> aClass.equals(clazz)).count() > 0;
    }
}

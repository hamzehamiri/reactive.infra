package org.infra.reactive.form.engine.form.engine.utils.gson;

import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;

import java.lang.reflect.Field;
import java.util.Optional;

public class BaseSerializer<T> {

    public JsonObject convert(T instance, JsonSerializationContext jsonSerializationContext) {
        Class<?> clazz = instance.getClass();
        Field[] fields = clazz.getDeclaredFields();

        JsonObject json = new JsonObject();

        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object val = field.get(instance);
                if (val instanceof Optional<?> valueOption) {
                    json.add(field.getName(), jsonSerializationContext.serialize(valueOption.get()));
                } else {
                    json.add(field.getName(), jsonSerializationContext.serialize(val));
                }

            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        return json;
    }

}

package org.infra.reactive.form.engine.form.engine.providers.jackson;

import lombok.Data;

import java.lang.reflect.Field;
import java.util.Map;

@Data
public class ClassMetaData {
    private String className;
    private Field[] fields;
    private Map<String, Field> fieldMap;
}

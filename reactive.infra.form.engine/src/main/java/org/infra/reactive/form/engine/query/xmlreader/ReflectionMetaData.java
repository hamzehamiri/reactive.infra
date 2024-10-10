package org.infra.reactive.form.engine.query.xmlreader;

import lombok.Data;

import java.lang.reflect.Field;
import java.util.Map;

@Data
public class ReflectionMetaData {
    private String className;
    private Map<String, Field> stringFieldMap;
}

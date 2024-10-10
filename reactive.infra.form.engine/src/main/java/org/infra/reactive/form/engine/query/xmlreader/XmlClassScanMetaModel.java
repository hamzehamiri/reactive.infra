package org.infra.reactive.form.engine.query.xmlreader;

import lombok.Data;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Data
public class XmlClassScanMetaModel {
    private Map<String, Field> fieldTagNameMap = new HashMap<>();
    private Map<String, Field> fieldAttributeNameMap = new HashMap<>();
}

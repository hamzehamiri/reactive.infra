package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

import java.io.Serializable;
import java.util.HashMap;

@Data
public class RecordModelDTO {
    private String uuid;
    private String display;
    private HashMap<Long, Serializable> pkFieldValues;
    private HashMap<Long, DataProviderAbstract<?, ?>> fieldValues;
    private HashMap<Long, HashMap<Long, Boolean>> coreExpressionEvaluateMap;
}

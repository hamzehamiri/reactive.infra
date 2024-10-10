package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.Map;

@Builder
@Value
public class QueryInsertWithParamModel {
    @Singular("AddParamValue")
    Map<Integer, Object> paramValue;
    String query;
}

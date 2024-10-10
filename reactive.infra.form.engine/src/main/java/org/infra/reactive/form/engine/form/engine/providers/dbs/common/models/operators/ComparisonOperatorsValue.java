package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators;

import lombok.Builder;
import lombok.Data;
import lombok.Singular;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

import java.util.List;

@Data
@Builder
public class ComparisonOperatorsValue {
    private ComparisonOperators operation;
    @Singular
    private List<Object> values;
}

package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.LogicalOperators;

import java.util.List;

@Value
@Builder
public class ColumnsCriteriaComparisonOperatorModel {
    @Singular("AddColumnCriteriaModel")
    List<ColumnCriteriaLogicalOperatorModel> columnCriteriaModels;
    LogicalOperators logicalOperators;
}

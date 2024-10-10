package org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.samples.number;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.OperatorConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistry;

@CoreFilterOperationJavaServiceRegistry(registerKey = OperatorConstant.number_less_than)
public class CoreFilterOperation_NumberGreaterThan extends CoreFilterOperationAbstract {
    @Override
    public void applyFilter(ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder) {
        generateFilter(columnsCriteriaComparisonOperatorModelBuilder, ComparisonOperators.number_greater_than);
    }
}

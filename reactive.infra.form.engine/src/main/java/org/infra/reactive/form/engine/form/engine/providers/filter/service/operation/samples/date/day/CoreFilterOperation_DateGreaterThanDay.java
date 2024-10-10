package org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.samples.date.day;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.OperatorConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistry;

@CoreFilterOperationJavaServiceRegistry(registerKey = OperatorConstant.date_greater_than_day)
public class CoreFilterOperation_DateGreaterThanDay extends CoreFilterOperationAbstract {
    @Override
    public void applyFilter(ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder) {
        generateFilter(columnsCriteriaComparisonOperatorModelBuilder, ComparisonOperators.date_greater_than_day);
    }
}

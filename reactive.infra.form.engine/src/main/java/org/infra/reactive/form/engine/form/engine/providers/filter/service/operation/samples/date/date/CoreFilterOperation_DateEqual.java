package org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.samples.date.date;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.OperatorConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistry;

@CoreFilterOperationJavaServiceRegistry(registerKey = OperatorConstant.string_equal)
public class CoreFilterOperation_DateEqual extends CoreFilterOperationAbstract {
    @Override
    public void applyFilter(ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder) {
        generateFilter(columnsCriteriaComparisonOperatorModelBuilder, ComparisonOperators.string_equal);
    }
}

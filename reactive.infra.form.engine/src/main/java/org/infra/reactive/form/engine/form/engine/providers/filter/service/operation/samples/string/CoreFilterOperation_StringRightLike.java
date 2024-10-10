package org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.samples.string;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.OperatorConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistry;

@CoreFilterOperationJavaServiceRegistry(registerKey = OperatorConstant.string_right_like)
public class CoreFilterOperation_StringRightLike extends CoreFilterOperationAbstract {
    @Override
    public void applyFilter(ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder) {
        generateFilter(columnsCriteriaComparisonOperatorModelBuilder, ComparisonOperators.string_right_like);
    }
}

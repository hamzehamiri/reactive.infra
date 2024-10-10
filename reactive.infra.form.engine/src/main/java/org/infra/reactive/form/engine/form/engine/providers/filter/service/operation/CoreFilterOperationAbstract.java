package org.infra.reactive.form.engine.form.engine.providers.filter.service.operation;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public abstract class CoreFilterOperationAbstract {
    protected TableExpression rootTableExpression;
    protected ColumnExpression columnExpression;
    protected Map<Long, DataProviderAbstract<?, ?>> params;

    public void generateFilter(ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder, ComparisonOperators comparisonOperators) {
        List<Object> dataProviderAbstractList = new ArrayList<>(params.size());
        for (Map.Entry<Long, DataProviderAbstract<?, ?>> longDataProviderAbstractEntry : params.entrySet()) {
            Serializable val = longDataProviderAbstractEntry.getValue().getKey();
            dataProviderAbstractList.add(val);
        }

        ComparisonOperatorsValue.ComparisonOperatorsValueBuilder operatorValueBuilder = ComparisonOperatorsValue.builder();
        operatorValueBuilder.operation(comparisonOperators);
        operatorValueBuilder.values(dataProviderAbstractList);

        ColumnCriteriaLogicalOperatorModel.ColumnCriteriaLogicalOperatorModelBuilder columnCriteriaLogicalOperatorModelBuilder = ColumnCriteriaLogicalOperatorModel.builder();
        columnCriteriaLogicalOperatorModelBuilder.columnExpression(columnExpression);
        columnCriteriaLogicalOperatorModelBuilder.operationValue(operatorValueBuilder.build());

        columnsCriteriaComparisonOperatorModelBuilder.AddColumnCriteriaModel(columnCriteriaLogicalOperatorModelBuilder.build());
    }

    public abstract void applyFilter(ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder);
}

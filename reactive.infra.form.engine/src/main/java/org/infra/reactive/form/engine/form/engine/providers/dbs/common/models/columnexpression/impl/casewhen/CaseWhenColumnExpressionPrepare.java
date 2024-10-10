package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.MultiColumnExpressionPrepare;

import java.io.Serializable;

public class CaseWhenColumnExpressionPrepare extends MultiColumnExpressionPrepare<CaseWhenColumnExpression, Serializable> {
    @Override
    public void generate(DataProviderObjects dataProviderObjects) {

    }

    @Override
    public void generateQuerySelectModelWithParamModel(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        QuerySelectModelWithParamModel query = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();
        if (columnExpression.getWhenLineExpressions() != null) {
            query.getRdbmsQueryStringBuilder().getColumnsPart().append(AbstractRDBMSQueryProvider.keyCase);
            for (WhenLineExpression whenLineExpression : columnExpression.getWhenLineExpressions()) {
                if (whenLineExpression.getWhenConditionExpressions() != null) {
                    query.getRdbmsQueryStringBuilder().getColumnsPart().append(AbstractRDBMSQueryProvider.keyWhen);

//                    ColumnExpressionPrepareFactory columnExpressionPrepareFactory = ColumnExpressionPrepareFactory.Instance();
//                    for (int i = 0; i < whenLineExpression.getWhenConditionExpressions().size() - 1; i++) {
//                        WhenConditionExpression whenConditionExpression = whenLineExpression.getWhenConditionExpressions().get(i);
//
//                        String operationCommand = whenConditionExpression.getOperationValue().getOperation().toString();
//                        Object operationValue = whenConditionExpression.getOperationValue().getValue();
//                        QuerySelectModelWithParamModel queryColumn = generateColumnExpression(whenConditionExpression.getColumnExpression());
//
//                        query.getQuery().getColumnsPart().append(queryColumn.getQuery().getColumnsPart()).append(operationCommand).append(operationValue).append(AbstractRDBMSQueryProvider.keyAnd);
//                    }
//                    if (whenLineExpression.getWhenConditionExpressions().size() > 1) {
//                        WhenConditionExpression whenConditionExpression = whenLineExpression.getWhenConditionExpressions().get(whenLineExpression.getWhenConditionExpressions().size() - 1);
//
//                        String operationCommand = whenConditionExpression.getOperationValue().getOperation().toString();
//                        Object operationValue = whenConditionExpression.getOperationValue().getValue();
//                        QuerySelectModelWithParamModel queryColumn = generateColumnExpression(whenConditionExpression.getColumnExpression());
//
//                        query.getQuery().getColumnsPart().append(queryColumn.getQuery().getColumnsPart()).append(operationCommand).append(operationValue);
//                    }

                    query.getRdbmsQueryStringBuilder().getColumnsPart().append(AbstractRDBMSQueryProvider.keyThen).append(AbstractRDBMSQueryProvider.keyCot).append(whenLineExpression.getThenValue()).append(AbstractRDBMSQueryProvider.keyCot);
                }
            }
        }

        if (columnExpression.getElseValue() != null) {
            query.getRdbmsQueryStringBuilder().getColumnsPart().append(AbstractRDBMSQueryProvider.keyElse).append(AbstractRDBMSQueryProvider.keyCot).append(columnExpression.getElseValue()).append(AbstractRDBMSQueryProvider.keyCot);
        }
        query.getRdbmsQueryStringBuilder().getColumnsPart().append(AbstractRDBMSQueryProvider.keyEnd);
    }

}

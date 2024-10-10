package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.listeners.AbstractQueryListener;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.dialect.FunctionDialectDB;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QueryInsertWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;
import org.jetbrains.annotations.NotNull;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public abstract class AbstractRDBMSQueryProvider extends AbstractQueryListener implements AbstractRDBMSConstantInterface {

    public AbstractRDBMSQueryProvider(AbstractQueryListener parentAbstractQueryListener) {
        super(parentAbstractQueryListener);
    }

    public enum ModelQueryGenerator {
        SelectModel, Insert
    }

    @Setter
    protected TableExpressionPrepare tableExpressionPrepare;
    @Setter
    protected ModelQueryGenerator modelQueryGenerator = ModelQueryGenerator.SelectModel;
    @Setter
    protected FunctionDialectDB functionDialectDB;
    @Getter
    protected RDBMSAliasProvider rdbmsAliasProvider;
    @Getter
    protected QuerySelectModelWithParamModel querySelectModelWithParamModel;
    @Setter
    @Getter
    protected AtomicInteger indexParameter = new AtomicInteger(1);

    public int incrementAndGetIndexParameter() {
        return indexParameter.getAndIncrement();
    }

    public abstract void generateQueryWithParam();

    public abstract <T> QueryInsertWithParamModel insertOrUpdateQueryWithParam(T o);

    public abstract String queryForMetaDataColumn(CoreTableDTO coreTableDTO, CoreTableDataSourceDTO dataBaseInfoModel);

    public void convertOperation(StringBuilder queryBuilder, ColumnCriteriaLogicalOperatorModel columnCriteriaModel) {
        Map<Integer, Object> parameters = getQuerySelectModelWithParamModel().getParamValue();

        ColumnExpression column = columnCriteriaModel.getColumnExpression();
        ComparisonOperatorsValue operationValue = columnCriteriaModel.getOperationValue();
        switch (operationValue.getOperation()) {
            case number_between -> {
                queryBuilder.append(columnCriteriaModel.getColumnExpression().getTableInterface().getAliasTableName())
                        .append(AbstractRDBMSQueryProvider.keyDOT)
                        .append(" ");

            }
            case string_left_like, string_right_like, string_like -> {
                for (Object value : columnCriteriaModel.getOperationValue().getValues()) {
                    int indexParam = this.incrementAndGetIndexParameter();
                    queryBuilder.append(column.getTableInterface().getAliasTableName())
                            .append(AbstractRDBMSQueryProvider.keyDOT)
                            .append(column.getColumnName())
                            .append(" like ")
                            .append(AbstractRDBMSQueryProvider.keyParam).append(indexParam)
                            .append(AbstractRDBMSQueryProvider.keyEmpty)
                    ;
                    parameters.put(indexParam, convertStringOperationValue(value, operationValue));
                }
            }
            default -> {
                for (Object value : columnCriteriaModel.getOperationValue().getValues()) {
                    int indexParam = this.incrementAndGetIndexParameter();
                    queryBuilder.append(column.getTableInterface().getAliasTableName())
                            .append(AbstractRDBMSQueryProvider.keyDOT)
                            .append(column.getColumnName())
                            .append(operationValue.getOperation().getDefaultAllSqlStandard())
                            .append(AbstractRDBMSQueryProvider.keyParam).append(indexParam)
                            .append(AbstractRDBMSQueryProvider.keyEmpty)
                    ;
                    parameters.put(indexParam, value);
                }
            }
        }
    }

    @NotNull
    private static Object convertStringOperationValue(Object value, ComparisonOperatorsValue operationValue) {
        Object refactorValue = null;
        if (operationValue.getOperation() == ComparisonOperators.string_left_like) {
            refactorValue = "%" + value;
        } else if (operationValue.getOperation() == ComparisonOperators.string_right_like) {
            refactorValue = value + "%";
        } else if (operationValue.getOperation() == ComparisonOperators.string_like) {
            refactorValue = "%" + value + "%";
        } else {
            refactorValue = "";
        }
        return refactorValue;
    }
}

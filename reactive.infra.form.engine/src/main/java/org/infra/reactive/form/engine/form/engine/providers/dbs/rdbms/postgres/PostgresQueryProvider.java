package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.postgres;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSQueryStringBuilder;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QueryInsertWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class PostgresQueryProvider extends AbstractRDBMSQueryProvider {

    public PostgresQueryProvider(PostgresQueryProvider parentPostgresQueryProvider, RDBMSAliasProvider rdbmsAliasProvider) {
        super(parentPostgresQueryProvider);
        this.rdbmsAliasProvider = rdbmsAliasProvider;
    }

    @Override
    public void generateQueryWithParam() {
        this.querySelectModelWithParamModel = new QuerySelectModelWithParamModel();
        this.querySelectModelWithParamModel.setMapColumnAlias(new HashMap<>());
        this.querySelectModelWithParamModel.setMapFieldIdUUIDColumn(new HashMap<>());
        this.querySelectModelWithParamModel.setMapColumnUUIDToColumnsExpression(new HashMap<>());
        this.querySelectModelWithParamModel.setMapDataProviderJavaAbstract(new HashMap<>());
        this.querySelectModelWithParamModel.setRdbmsQueryStringBuilder(new RDBMSQueryStringBuilder());
        this.querySelectModelWithParamModel.setParamValue(new HashMap<>());
        if (tableExpressionPrepare != null)
            tableExpressionPrepare.generateQuerySelectModelWithParamModel(this);
    }

    @Override
    public <T> QueryInsertWithParamModel insertOrUpdateQueryWithParam(T o) {
        Class<?> clazz = o.getClass();
        CoreTableDefinition coreTableDefinition = clazz.getDeclaredAnnotation(CoreTableDefinition.class);

        StringBuilder insertQuery = new StringBuilder();
        insertQuery.append(keyInsertInto);
        StringBuilder parameter = new StringBuilder();

        Map<Integer, Object> paramIndexValue = null;

        if (coreTableDefinition != null) {
            insertQuery.append(coreTableDefinition.tableName()).append(keyLeftParenthesis);
            parameter.append(keyLeftParenthesis);
            boolean isSeparatorIsAppended = false;
            paramIndexValue = new HashMap<>(clazz.getDeclaredFields().length);
            int index = 1;
            for (int i = 0; i < clazz.getDeclaredFields().length; i++) {
                Field field = clazz.getDeclaredFields()[i];
                field.setAccessible(true);

                CoreColumnDefinition coreColumnDefinition = field.getDeclaredAnnotation(CoreColumnDefinition.class);
                if (coreColumnDefinition != null) {
                    isSeparatorIsAppended = true;
                    insertQuery.append(coreColumnDefinition.columnName()).append(columnSeparator);

                    if (coreColumnDefinition.isPk() && !coreColumnDefinition.sequenceName().isEmpty()) {
                        parameter.append(functionDialectDB.NextSequence())
                                .append(keyLeftParenthesis).append(keyCot)
                                .append(coreColumnDefinition.sequenceName())
                                .append(keyCot).append(keyRightParenthesis)
                                .append(columnSeparator);
                    } else {
                        try {
                            Object value = field.get(o);
                            if (value instanceof Optional<?>) {
                                parameter.append("$").append(index).append(columnSeparator);
                                paramIndexValue.put(index++, ((Optional<?>) value).get());
                            }
                        } catch (IllegalAccessException e) {
                            throw new RuntimeException(e);
                        }
                    }
                }
            }
            if (isSeparatorIsAppended) {
                insertQuery.delete(insertQuery.length() - columnSeparator.length(), insertQuery.length());
                insertQuery.append(keyRightParenthesis);

                parameter.delete(parameter.length() - columnSeparator.length(), parameter.length());
                parameter.append(keyRightParenthesis);

                insertQuery.append(keyValues).append(parameter);
            }
        }


        return QueryInsertWithParamModel.builder()
                .query(insertQuery.toString())
                .paramValue(paramIndexValue)
                .build();
    }

    @Override
    public String queryForMetaDataColumn(CoreTableDTO coreTableDTO, CoreTableDataSourceDTO dataBaseInfoModel) {
        return String.format("SELECT * \n" +
                "                FROM information_schema.columns\n" +
                "                WHERE table_schema = '%s' \n" +
                "                  AND table_name = '%s' ", dataBaseInfoModel.getSchema(), coreTableDTO.getTablename());
    }

//    public QuerySelectModelWithParamModel generateColumnExpression(ColumnExpressionPrepare<?> columnExpression) {
//        if (columnExpression.getClass().equals(CaseWhenColumnExpression.class)) {
//            return generateSQLCaseWhen((CaseWhenColumnExpression) columnExpression);
//        } else if (columnExpression.getClass().equals(ColumnMetaModel.class)) {
//            return generateSqlColumnExpression((ColumnMetaModel) columnExpression);
//        } else if (columnExpression.getClass().equals(MultiColumnExpression.class)) {
//            return generateSqlMultiColumnExpression((MultiColumnExpression) columnExpression);
//        } else if (columnExpression.getClass().equals(TableExpression.class)) {
//            return generateSqlSelectModel((TableExpression) columnExpression);
//        }
//    }

//    public QuerySelectModelWithParamModel generateSqlSelectModel(TableExpressionPrepare tableExpressionPrepare) {
//        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider(this, rdbmsAliasProvider);
//        postgresQueryProvider.setTableExpressionPrepare(tableExpressionPrepare);
//        return postgresQueryProvider.generateQueryWithParam();
//    }

//    public QuerySelectModelWithParamModel generateSqlMultiColumnExpression(MultiColumnExpression multiColumnExpression) {
//        List<QuerySelectModelWithParamModel> queries = new ArrayDeque<>();
//        for (ColumnExpression columnExpression : multiColumnExpression.getColumnExpressionList()) {
//            QuerySelectModelWithParamModel queryOne = generateColumnExpression(columnExpression);
//            queries.add(queryOne);
//        }
//        return queries.get(0);
//    }

//    public QuerySelectModelWithParamModel generateSqlColumnExpression(ColumnMetaModel columnMetaModel) {
//        QuerySelectModelWithParamModel query = generate();
//        if (columnMetaModel.getTable().getAliasTableName() != null) {
//            query.getQuery().getColumnsPart().append(columnMetaModel.getTable().getAliasTableName()).append(keyDOT).append(columnMetaModel.getColumnName());
//        } else {
//            query.getQuery().getColumnsPart().append(columnMetaModel.getTable().generateTableExpression()).append(keyDOT).append(columnMetaModel.getColumnName());
//        }
//        return query;
//    }

//    private QuerySelectModelWithParamModel generate() {
//        return new QuerySelectModelWithParamModel()
//                .setMapColumnAlias(new HashMap<>())
//                .setQuery(new RDBMSQueryStringBuilder());
//    }

//    public QuerySelectModelWithParamModel generateSQLCaseWhen(CaseWhenColumnExpression caseWhenColumnExpression) {
//        QuerySelectModelWithParamModel query = generate();
//        if (caseWhenColumnExpression.getWhenExpressionLines() != null) {
//            query.getQuery().getColumnsPart().append(keyCase);
//            for (WhenExpressionLine whenExpressionLine : caseWhenColumnExpression.getWhenExpressionLines()) {
//                if (whenExpressionLine.getWhenExpressionConditions() != null) {
//                    query.getQuery().getColumnsPart().append(keyWhen);
//                    for (int i = 0; i < whenExpressionLine.getWhenExpressionConditions().size() - 1; i++) {
//                        WhenExpressionCondition whenExpressionCondition = whenExpressionLine.getWhenExpressionConditions().get(i);
//
//                        String operationCommand = whenExpressionCondition.getOperationValue().getOperation().toString();
//                        Object operationValue = whenExpressionCondition.getOperationValue().getValue();
//                        QuerySelectModelWithParamModel queryColumn = generateColumnExpression(whenExpressionCondition.getColumnExpression());
//
//                        query.getQuery().getColumnsPart().append(queryColumn.getQuery().getColumnsPart()).append(operationCommand).append(operationValue).append(keyAnd);
//                    }
//                    if (whenExpressionLine.getWhenExpressionConditions().size() > 1) {
//                        WhenExpressionCondition whenExpressionCondition = whenExpressionLine.getWhenExpressionConditions().get(whenExpressionLine.getWhenExpressionConditions().size() - 1);
//
//                        String operationCommand = whenExpressionCondition.getOperationValue().getOperation().toString();
//                        Object operationValue = whenExpressionCondition.getOperationValue().getValue();
//                        QuerySelectModelWithParamModel queryColumn = generateColumnExpression(whenExpressionCondition.getColumnExpression());
//
//                        query.getQuery().getColumnsPart().append(queryColumn.getQuery().getColumnsPart()).append(operationCommand).append(operationValue);
//                    }
//
//                    query.getQuery().getColumnsPart().append(keyThen).append(keyCot).append(whenExpressionLine.getThenValue()).append(keyCot);
//                }
//            }
//        }
//
//        if (caseWhenColumnExpression.getElseValue() != null) {
//            query.getQuery().getColumnsPart().append(keyElse).append(keyCot).append(caseWhenColumnExpression.getElseValue()).append(keyCot);
//        }
//        query.getQuery().getColumnsPart().append(keyEnd);
//        return query;
//    }
}

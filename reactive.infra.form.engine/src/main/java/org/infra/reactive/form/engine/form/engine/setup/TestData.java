package org.infra.reactive.form.engine.form.engine.setup;


import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.CoreWindowDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen.CaseWhenColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen.WhenConditionExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.casewhen.WhenLineExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.multicolumn.MultiColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.LogicalOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;

import java.util.HashMap;
import java.util.Map;

public class TestData {

    public static TableExpressionPrepare sample1() {
        TableMetadata userAddressTable = CoreTables.coreTable();
        userAddressTable.setMasterTable(true);

        TableMetadata userAddressTypeTable = CoreTables.coreTable();
        TableMetadata usersTable = CoreTables.coreTable();

        ColumnExpression userAddressId = userAddressTable.getColumns().get(1L);
        ColumnExpression userAddressName = userAddressTable.getColumns().get(2L);
        ColumnExpression userId = usersTable.getColumns().get(4L);
        MultiColumnExpression multiColumn = MultiColumnExpression.builder()
                .AddColumnExpression(userAddressName)
                .AddColumnExpression(userAddressName).build();


        WhenLineExpression whenExpression1 = WhenLineExpression.builder()
                .AddWhenExpressionCondition(
                        WhenConditionExpression.builder()
                                .columnExpression(userId)
                                .operationValue(ComparisonOperatorsValue.builder().operation(ComparisonOperators.number_equal).value(10).build())
                                .build())
                .AddWhenExpressionCondition(
                        WhenConditionExpression.builder()
                                .columnExpression(userId)
                                .operationValue(ComparisonOperatorsValue.builder().operation(ComparisonOperators.number_greater_than).value(20).build())
                                .build())
                .thenValue("Test10")
                .build();

        WhenLineExpression whenExpression2 = WhenLineExpression.builder()
                .AddWhenExpressionCondition(
                        WhenConditionExpression.builder()
                                .columnExpression(userId)
                                .operationValue(ComparisonOperatorsValue.builder().operation(ComparisonOperators.number_equal).value(20).build())
                                .build())
                .AddWhenExpressionCondition(
                        WhenConditionExpression.builder()
                                .columnExpression(userId)
                                .operationValue(ComparisonOperatorsValue.builder().operation(ComparisonOperators.number_less_than).value(10).build())
                                .build())
                .thenValue("Test20")
                .build();


        CaseWhenColumnExpression caseWhenFamily = CaseWhenColumnExpression.builder()
                .AddWhenExpressionLine(whenExpression1)
                .AddWhenExpressionLine(whenExpression2)
                .elseValue(" ELSE Value ")
                .build();

        JoinColumnModel joinUserAddressToUser = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.InnerJoin)
                .fromTable(userAddressTable)
                .fromColumn(userAddressTable.getColumns().get(3L))
                .toTable(usersTable)
                .toColumn(usersTable.getColumns().get(4L))
                .build();

        JoinColumnModel joinUserAddressToUserAddressType = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.InnerJoin)
                .fromTable(userAddressTable)
                .fromColumn(userAddressTable.getColumns().get(4L))
                .toTable(userAddressTypeTable)
                .toColumn(userAddressTypeTable.getColumns().get(6L))
                .build();


        ColumnsCriteriaComparisonOperatorModel columnCriteria = ColumnsCriteriaComparisonOperatorModel.builder()
                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel.builder()
                        .columnExpression(userId)
                        .operationValue(ComparisonOperatorsValue.builder()
                                .operation(ComparisonOperators.number_greater_than)
                                .value(0)
                                .build()).build())
                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel.builder()
                        .columnExpression(userId)
                        .operationValue(ComparisonOperatorsValue.builder()
                                .operation(ComparisonOperators.number_less_than)
                                .value(30)
                                .build()).build())
                .logicalOperators(LogicalOperators.OR)
                .build();


        TableExpression selectModel = new TableExpression()
                .setId(1L)
                .AddTable(userAddressTable.getID(), userAddressTable)
                .AddColumnExpression(userAddressId.getID(), userAddressId)
                .AddColumnExpression(userAddressName.getID(), userAddressName)
                .AddColumnExpression(caseWhenFamily.getID(), caseWhenFamily)
                .AddColumnExpression(multiColumn.getID(), multiColumn)
                .AddJoinColumn(joinUserAddressToUser)
                .AddJoinColumn(joinUserAddressToUserAddressType)
                .setCriteria(columnCriteria);

        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(selectModel);
        return tableExpressionPrepare;
    }

    public static CoreWindowDTO windowUsers() {

        CoreWindowTabDTO userFormModel = new CoreWindowTabDTO();
        userFormModel.setName("user");
        userFormModel.setTranslate("کاربران");


        Map<Long, CoreWindowTabDTO> formModelMap = new HashMap<>();
        formModelMap.put(Math.round(Math.random() * 1000), userFormModel);

        CoreWindowDTO metaDataWindowModel = new CoreWindowDTO();
        metaDataWindowModel.setTranslate("پنچره کاربران");
        metaDataWindowModel.setName("Window Users");
        metaDataWindowModel.setCoreWindowTabDTOMap(formModelMap);


        return metaDataWindowModel;
    }
}

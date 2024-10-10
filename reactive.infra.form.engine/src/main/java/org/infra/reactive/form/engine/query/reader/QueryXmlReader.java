package org.infra.reactive.form.engine.query.reader;

import org.infra.reactive.form.engine.query.model.QueryModel;
import org.infra.reactive.form.engine.query.model.aggregate.GroupByModel;
import org.infra.reactive.form.engine.query.model.common.ColumnModel;
import org.infra.reactive.form.engine.query.model.join.JoinColumnModel;
import org.infra.reactive.form.engine.query.model.join.JoinsModel;
import org.infra.reactive.form.engine.query.model.select.FromModel;
import org.infra.reactive.form.engine.query.model.select.SelectModel;
import org.infra.reactive.form.engine.query.model.where.*;
import org.infra.reactive.form.engine.xml.JaxBXmlService;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

public class QueryXmlReader {
    public static void main(String[] args) {
        convertModelToXMLString();
    }

    public static void convertModelToXMLString() {
        QueryModel queryModel = sample1();

        String xml = JaxBXmlService.getXmlString(QueryModel.class, queryModel);

        System.out.println(xml);
    }

    public static void readXmlFile() {
        try {
            InputStream inputStream = QueryXmlReader.class.getClassLoader().getResourceAsStream("static/QueryXML.xml");
            if (inputStream != null) {
                QueryModel queryModel = JaxBXmlService.getValue(QueryModel.class, new String(inputStream.readAllBytes(), StandardCharsets.UTF_8));
                System.out.println("DD");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static QueryModel sample1() {
        QueryModel innerCol = sample2();

        ColumnModel columnModel_name_select = new ColumnModel();
        columnModel_name_select.setUuid(UUID.randomUUID().toString());
        columnModel_name_select.setCore_table_id(1);
        columnModel_name_select.setCore_table_column_id(10);

        ColumnModel columnModel_family_select = new ColumnModel();
        columnModel_family_select.setUuid(UUID.randomUUID().toString());
        columnModel_family_select.setCore_table_id(2);
        columnModel_family_select.setCore_table_column_id(11);

        FromModel fromModel = new FromModel();
        fromModel.setCore_table_id(11);

        JoinColumnModel joinColumnModel = new JoinColumnModel();
        joinColumnModel.setId(12);
        joinColumnModel.setFromColumn(columnModel_name_select);
        joinColumnModel.setToColumn(columnModel_family_select);
        joinColumnModel.setOperation("=");

        SelectModel selectModel = new SelectModel();
        selectModel.setId(10);
        selectModel.setColumnInterfaces(List.of(columnModel_name_select, innerCol));

        JoinsModel joinsModel = new JoinsModel();
        joinsModel.setJoinColumns(List.of(joinColumnModel));

        SqlLogicalOperatorValue sqlLogicalOperatorValue1 = new SqlLogicalOperatorValue();
        sqlLogicalOperatorValue1.setValue("100");

        SqlLogicalOperatorValue sqlLogicalOperatorValue2 = new SqlLogicalOperatorValue();
        sqlLogicalOperatorValue2.setValue("200");

        SqlLogicalOperator sqlLogicalOperator_Name = new SqlLogicalOperator();
        sqlLogicalOperator_Name.setOperator("=");
        sqlLogicalOperator_Name.setFromColumn(columnModel_name_select);
        sqlLogicalOperator_Name.setSqlLogicalOperatorValue(sqlLogicalOperatorValue1);

        SqlLogicalOperator sqlLogicalOperator_Id = new SqlLogicalOperator();
        sqlLogicalOperator_Id.setOperator("=");
        sqlLogicalOperator_Id.setFromColumn(columnModel_name_select);
        sqlLogicalOperator_Id.setSqlLogicalOperatorValue(sqlLogicalOperatorValue2);

        SqlComparatorOperator sqlComparatorOperator = new SqlComparatorOperator();
        sqlComparatorOperator.setOperator("and");
        sqlComparatorOperator.setSqlLogicalOperators(List.of(sqlLogicalOperator_Name, sqlLogicalOperator_Id));

        SqlComparatorOperators sqlComparatorOperators = new SqlComparatorOperators();
        sqlComparatorOperators.setSqlComparatorOperatorList(List.of(sqlComparatorOperator));

        WhereModel whereModel = new WhereModel();
        whereModel.setId(11);
        whereModel.setSqlComparatorOperators(sqlComparatorOperators);

        GroupByModel groupByModel = new GroupByModel();
        groupByModel.setColumnModels(List.of(columnModel_family_select));

        QueryModel queryModel = new QueryModel();
        queryModel.setSelectModel(selectModel);
        queryModel.setFromModel(fromModel);
        queryModel.setJoinsModel(joinsModel);
        queryModel.setWhereModel(whereModel);
        queryModel.setGroupByModel(groupByModel);

        return queryModel;
    }

    public static QueryModel sample2() {
        ColumnModel columnModel_name_select = new ColumnModel();
        columnModel_name_select.setUuid(UUID.randomUUID().toString());
        columnModel_name_select.setCore_table_id(1);

        SelectModel selectModel = new SelectModel();
        selectModel.setId(10);
        selectModel.setColumnInterfaces(List.of(columnModel_name_select));

        FromModel fromModel = new FromModel();
        fromModel.setCore_table_id(11);

        SqlLogicalOperatorValue sqlLogicalOperatorValue1 = new SqlLogicalOperatorValue();
        sqlLogicalOperatorValue1.setValue("100");

        SqlLogicalOperator sqlLogicalOperator_Name = new SqlLogicalOperator();
        sqlLogicalOperator_Name.setOperator(">=");
        sqlLogicalOperator_Name.setFromColumn(columnModel_name_select);
        sqlLogicalOperator_Name.setSqlLogicalOperatorValue(sqlLogicalOperatorValue1);

        SqlComparatorOperator sqlComparatorOperator = new SqlComparatorOperator();
        sqlComparatorOperator.setOperator("and");
        sqlComparatorOperator.setSqlLogicalOperators(List.of(sqlLogicalOperator_Name));

        SqlComparatorOperators sqlComparatorOperators = new SqlComparatorOperators();
        sqlComparatorOperators.setSqlComparatorOperatorList(List.of(sqlComparatorOperator));

        WhereModel whereModel = new WhereModel();
        whereModel.setId(11);
        whereModel.setSqlComparatorOperators(sqlComparatorOperators);

        QueryModel queryModel = new QueryModel();
        queryModel.setSelectModel(selectModel);
        queryModel.setFromModel(fromModel);
        queryModel.setWhereModel(whereModel);

        return queryModel;
    }
}

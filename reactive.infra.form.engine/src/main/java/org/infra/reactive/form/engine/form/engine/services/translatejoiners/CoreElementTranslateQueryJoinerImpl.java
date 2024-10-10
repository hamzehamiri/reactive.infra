package org.infra.reactive.form.engine.form.engine.services.translatejoiners;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;
import org.infra.reactive.form.engine.form.engine.services.TranslateQueryJoiner;
import org.infra.reactive.form.engine.form.engine.services.TranslatedRegisterQuery;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;

import java.util.Map;

public class CoreElementTranslateQueryJoinerImpl extends TranslateQueryJoiner<String> {

    public final static String key_core_element_name = "core_element_name";

    @Override
    public void init() {
        keyProvider.add("exception");
        keyProvider.add("login");

        keyProvider.iterator().forEachRemaining(key -> {
            TranslatedRegisterQuery.RegisterQueryJoiner(key, CoreElementTranslateQueryJoinerImpl.class);
        });
    }

    @Override
    public Class<String> getClazzDTO() {
        return null;
    }

    @Override
    public JoinColumnModelAndColumnAndCriteria createTargetElementJoin(TableMetadata fromTable, ColumnMetaModel fromColumn, Map<String, Object> extraParameter) {
        TableMetadata coreElement = CoreServiceEntityTable.findByTableName("core_element");
        ColumnMetaModel coreElement_id = coreElement.getColumns().get(9L);
        ColumnMetaModel coreElement_coreAllElementId = coreElement.getColumns().get(10L);
        ColumnMetaModel coreElement_name = coreElement.getColumns().get(11L);

        JoinColumnModel joinCoreTranslateMetadataToCoreAllElement = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.InnerJoin)
                .toTable(coreElement)
                .toColumn(coreElement_id)
                .fromTable(fromTable)
                .fromColumn(fromColumn)
                .build();

        JoinColumnModelAndColumnAndCriteria.JoinColumnModelAndColumnAndCriteriaBuilder builder = JoinColumnModelAndColumnAndCriteria.builder()
                .joinColumnModel(joinCoreTranslateMetadataToCoreAllElement)
                .nameColumn(coreElement_name)
                .keyColumn(coreElement_id);
        if (extraParameter != null && extraParameter.size() > 0) {
            ColumnCriteriaLogicalOperatorModel criteriaName = ColumnCriteriaLogicalOperatorModel
                    .builder()
                    .columnExpression(coreElement_name)
                    .operationValue(ComparisonOperatorsValue
                            .builder()
                            .operation(ComparisonOperators.number_equal)
                            .value(extraParameter.get(key_core_element_name))
                            .build()
                    ).build();

            builder.AddExtraParameterCriteria(criteriaName);
        }

        return builder.build();
    }
}

package org.infra.reactive.form.engine.form.engine.services.translatejoiners;

import lombok.Builder;
import lombok.Data;
import lombok.Singular;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;

import java.util.List;

@Builder
@Data
public class JoinColumnModelAndColumnAndCriteria {
    private JoinColumnModel joinColumnModel;
    private ColumnMetaModel keyColumn;
    private ColumnMetaModel nameColumn;
    @Singular("AddExtraParameterCriteria")
    private List<ColumnCriteriaLogicalOperatorModel> extraParameterCriteria;
}

package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.crud;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnValueMetaData;

import java.util.Map;

@Builder
@Value
public class InsertModel {
    TableInterface table;
    @Singular("AddColumnValue")
    Map<Integer, ColumnValueMetaData> paramValue;
    ColumnsCriteriaComparisonOperatorModel criteria;
}

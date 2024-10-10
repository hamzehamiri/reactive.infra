package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join;

import lombok.Builder;
import lombok.Data;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;


@Data
@Builder
public class JoinColumnModel {
    private JoinTypeEnum joinTypeEnum;
    private TableInterface fromTable;
    private ColumnExpression fromColumn;
    private TableInterface toTable;
    private ColumnExpression toColumn;
}

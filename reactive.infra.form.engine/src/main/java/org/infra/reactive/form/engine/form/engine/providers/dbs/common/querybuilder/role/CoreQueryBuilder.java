package org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.role;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QueryInsertWithParamModel;

public class CoreQueryBuilder {
    public static QueryInsertWithParamModel convert(CoreUserAuthenticateRequestDTO user, CoreRoleEntity coreRoleMetaData) {
//        TableMetadata coreRoleMetaDataTable = CoreTables.coreRole();
//        coreRoleMetaDataTable.setSequencer();
//        InsertModel insertModel = InsertModel.builder()
//                .table(coreRoleMetaDataTable)
//                .AddColumnValue(0, ColumnValueMetaData.builder()
//                        .columnExpression(coreRoleMetaDataTable.getColumns().get()))
//                .AddColumnValue(1, )
//                .build();

        return QueryInsertWithParamModel.builder().build();
    }
}

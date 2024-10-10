package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementWithRecordIdDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;

import java.io.Serializable;
import java.util.UUID;

@Setter
public abstract class ColumnExpressionPrepare<C extends ColumnExpression, KEY extends Serializable> {
    @Getter
    protected C columnExpression;
    protected ColumnExpressionPrepare<?, ?> parentColumnExpressionPrepare;
    @Getter
    protected DataProviderJavaAbstract<?, C, KEY> dataProviderJavaAbstract;
    protected CoreTableDataSourceDTO coreTableDataSourceDTO;
    @Getter
    protected boolean compatibleDataSourceWithMaster;

    public String getUUID() {
        return UUID.randomUUID().toString();
    }

    public void generateColumnExpression(DataProviderObjects dataProviderObjects) {

    }

    public CoreAllElementWithRecordIdDTO computeEffectiveCoreAllElementDTO(DataProviderObjects dataProviderObjects) {
        if (dataProviderObjects.coreWindowTabFieldDTO != null) {
            return new CoreAllElementWithRecordIdDTO(CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Field), dataProviderObjects.coreWindowTabFieldDTO.getId());
        } else if (dataProviderObjects.coreTableColumnDTO != null) {
            return new CoreAllElementWithRecordIdDTO(CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Column), dataProviderObjects.coreTableColumnDTO.getId());
        } else {
            return new CoreAllElementWithRecordIdDTO(CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Table), 100);
        }
    }

    public abstract void generate(DataProviderObjects dataProviderObjects);

    public abstract void generateQuerySelectModelWithParamModel(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider);
}

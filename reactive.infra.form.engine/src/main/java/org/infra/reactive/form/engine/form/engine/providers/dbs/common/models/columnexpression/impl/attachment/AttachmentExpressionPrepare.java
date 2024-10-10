package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.attachment;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderAttachmentDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.PrimaryExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;

import java.util.Optional;
import java.util.UUID;

public class AttachmentExpressionPrepare extends PrimaryExpressionPrepare {

    private CoreTableColumnDataProviderAttachmentDTO coreTableColumnDataProviderAttachmentDTO;

    @Override
    public void generate(DataProviderObjects dataProviderObjects) {
        Optional<CoreTableColumnDataProviderAttachmentDTO> coreTableColumnDataProviderAttachmentDTOOptional = CoreServiceDTOTable.coreTableColumnDataProviderAttachmentDTOLRUCache.get(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
        coreTableColumnDataProviderAttachmentDTOOptional.ifPresent(coreTableColumnDataProviderAttachmentDTO -> {
            if (coreTableColumnDataProviderAttachmentDTO.getCoreTableColumnDataProviderSerializerDTO() != null && coreTableColumnDataProviderAttachmentDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey() != null) {
                this.coreTableColumnDataProviderAttachmentDTO = coreTableColumnDataProviderAttachmentDTO;

                setCompatibleDataSourceWithMaster(false);

                DataProviderJavaAbstract<?, ColumnExpression, Long> dataProviderJavaAbstractNew = DataProviderJavaServiceRegistry.Instance().factoryInstance(coreTableColumnDataProviderAttachmentDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey(), dataProviderObjects.userSecurity, computeEffectiveCoreAllElementDTO(dataProviderObjects));
                dataProviderJavaAbstractNew.setCoreTableColumnDataProviderWithSerializerDTO(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO());
                setDataProviderJavaAbstract(dataProviderJavaAbstractNew);
            }
            if (getColumnExpression() != null) {
                this.uuid = getColumnExpression().getID();
                getDataProviderJavaAbstract().setColumnExpression(getColumnExpression());
            } else {
                this.uuid = UUID.randomUUID().toString();
            }
            if (dataProviderObjects.coreWindowTabFieldDTO != null) {
                getDataProviderJavaAbstract().setKey(dataProviderObjects.coreWindowTabFieldDTO.getId());
            }
        });
    }
}

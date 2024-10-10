package org.infra.reactive.form.engine.form.engine.providers.coretableservices.attachment;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorAttachment;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorAttachmentDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;
import java.util.ArrayList;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_AttachmentTypeAttachment,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Attachment
)
public class DataProviderAttachment extends DataProviderJavaAbstract<EditorAttachment, ColumnExpression, Serializable> {
    public DataProviderAttachment(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public EditorAttachment convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        EditorAttachment editorAttachment = new EditorAttachment();

        ArrayList<EditorAttachmentDTO> keyValueDTOList = new ArrayList<>();

        for (String pkColumn : querySelectModelWithParamModel.getSelectModel().getColumnExpression().getPkColumns().keySet()) {
            Long id = row.get(querySelectModelWithParamModel.getSelectModel().getColumnExpression().getPkColumns().get(pkColumn).getAliasColumnName(), Long.class);
            if (querySelectModelWithParamModel.getCoreWindowTabDTO() != null) {
                Long coreWindowTabId = querySelectModelWithParamModel.getCoreWindowTabDTO().getId();

                EditorAttachmentDTO editorAttachmentDTO = new EditorAttachmentDTO();
                editorAttachmentDTO.setId(1L);
                editorAttachmentDTO.setFileName("FileName.txt");
                editorAttachmentDTO.setCoreAllElementDTO(coreAllElementWithRecordIdDTO.getCoreAllElementDTO());
                editorAttachmentDTO.setRecordId(coreAllElementWithRecordIdDTO.getRecordId());

                EditorAttachmentDTO editorAttachmentDTO1 = new EditorAttachmentDTO();
                editorAttachmentDTO1.setId(2L);
                editorAttachmentDTO1.setFileName("Test Check Form Test.txt");
                editorAttachmentDTO1.setCoreAllElementDTO(new CoreAllElementDTO());
                editorAttachmentDTO1.setRecordId(102L);

                keyValueDTOList.add(editorAttachmentDTO);
                keyValueDTOList.add(editorAttachmentDTO1);
            }
        }

        editorAttachment.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        editorAttachment.setOriginalData(keyValueDTOList);
        return editorAttachment;
    }

    @Override
    public EditorAttachment convertFromRawData(Object data) {
        return null;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Primary;
    }

    @Override
    public void convertQuery() {

    }
}

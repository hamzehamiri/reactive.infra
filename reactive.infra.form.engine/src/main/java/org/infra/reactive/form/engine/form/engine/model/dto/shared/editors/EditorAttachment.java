package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EditorAttachment extends ListKeyValueDTO<Long, EditorAttachmentDTO> {


    @Override
    public String getDisplay() {
        return getOriginalData().toString();
    }
}

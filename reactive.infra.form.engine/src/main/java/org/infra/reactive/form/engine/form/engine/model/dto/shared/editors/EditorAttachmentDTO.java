package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
public class EditorAttachmentDTO implements Serializable {

    private Long id;
    private String uuid;
    private String fileName;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;

    @Override
    public String toString() {
        return fileName;
    }
}

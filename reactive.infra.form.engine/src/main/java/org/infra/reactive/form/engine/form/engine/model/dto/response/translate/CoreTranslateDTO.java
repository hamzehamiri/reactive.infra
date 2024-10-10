package org.infra.reactive.form.engine.form.engine.model.dto.response.translate;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;
import java.util.HashMap;

@Data
public class CoreTranslateDTO implements Serializable {
    private Long id;
    private Long recordId;
    private String translateValue;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    private CoreAllElementDTO coreAllElementDTO;
    private HashMap<String, String> coreGeneralRecordDTO;
}

package org.infra.reactive.form.engine.form.engine.model.dto.request;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;
import java.util.Map;

@Data
public class CoreTranslateRequestDTO implements Serializable {
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    private String registerKey;
    private Map<String, Object> extraParameter;
}

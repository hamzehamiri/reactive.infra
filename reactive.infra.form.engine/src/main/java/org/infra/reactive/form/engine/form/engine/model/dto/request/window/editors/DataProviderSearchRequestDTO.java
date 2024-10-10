package org.infra.reactive.form.engine.form.engine.model.dto.request.window.editors;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PagingDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;
import java.util.Map;

@Data
public class DataProviderSearchRequestDTO {
    private Long id;
    private Long coreWindowTabId;
    private Long coreWindowTabFieldId;
    private Long coreProcessParamId;
    private String rawText;
    private Map<Long, Serializable> fieldValues;
    private PagingDTO pagingDTO;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
}

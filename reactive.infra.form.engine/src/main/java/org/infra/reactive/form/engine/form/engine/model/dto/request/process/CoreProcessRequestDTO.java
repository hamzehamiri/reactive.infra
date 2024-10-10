package org.infra.reactive.form.engine.form.engine.model.dto.request.process;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.RecordModelDTO;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
public class CoreProcessRequestDTO implements Serializable {
    private String uuid;
    private Long id;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    private Map<Long, Serializable> coreProcessParamValueMap;
    private List<RecordModelDTO> recordModelDTOList;
    private Long recordId;
    private CoreAllElementDTO coreAllElementDTO;
    private CoreProcessRequestStatusDTO coreProcessRequestStatusDTO;
}

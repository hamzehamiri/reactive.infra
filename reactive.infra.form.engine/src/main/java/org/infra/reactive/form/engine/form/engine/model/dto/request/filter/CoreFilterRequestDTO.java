package org.infra.reactive.form.engine.form.engine.model.dto.request.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreFilterRequestDTO implements Serializable {
    private List<CoreFilterRequestElementRecordDTO> coreFilterRequestElementRecordDTOArray;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
}

package org.infra.reactive.form.engine.form.engine.model.dto.request.menu;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreMenuRequestDTO implements Serializable {
    private long parentNodeId;
    private String textSearch;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
}

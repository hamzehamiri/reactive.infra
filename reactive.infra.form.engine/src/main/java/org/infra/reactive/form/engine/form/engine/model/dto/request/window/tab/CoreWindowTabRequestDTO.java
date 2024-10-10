package org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreWindowTabRequestDTO implements Serializable {
    private long id;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
}

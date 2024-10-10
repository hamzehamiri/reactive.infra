package org.infra.reactive.form.engine.form.engine.model.dto.request.window;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreWindowRequestDTO implements Serializable {
    private Long id;
    private Long coreWindowTabId;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.translate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreTranslateLanguageDTO implements Serializable {
    private Long id;
    private String localeName;
    private String language;
    private CommonCountryDTO commonCountry;
    private boolean isRTL;
}

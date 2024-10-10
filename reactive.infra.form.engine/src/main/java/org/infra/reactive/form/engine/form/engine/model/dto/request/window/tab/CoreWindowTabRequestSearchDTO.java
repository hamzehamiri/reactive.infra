package org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PagingDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementWithOperandDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreWindowTabRequestSearchDTO implements Serializable {
    private String uuidTarget;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    private Long coreWindowTabId;
    private PagingDTO pagingDTO;
    private Map<Long, CoreWindowTabFieldSortOrderProfileDTO> sortOrderMap;
    private CoreFilterRequestElementWithOperandDTO coreFilterRequestElementWithOperandDTO;
}

package org.infra.reactive.form.engine.form.engine.providers.filter.elements.tab;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignElementMasterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.providers.filter.elements.FilterUtil;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderConstant;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;

import java.util.List;
import java.util.Optional;

@CoreFilterProviderJavaServiceRegistry(registerKey = CoreFilterProviderConstant.registerKey_tab)
public class FilterTabProviderJava extends CoreFilterProviderJavaServiceAbstract<CoreFilterAssignElementMasterDTO, CoreServiceBaseEntity> {

    public FilterTabProviderJava(CoreUserAuthenticateRequestDTO userSecurity, CoreFilterRequestDTO coreFilterRequestDTO, CoreFilterProviderDTO coreFilterProviderDTO) {
        super(userSecurity, coreFilterRequestDTO, coreFilterProviderDTO);
    }

    @Override
    public List<CoreFilterAssignElementMasterDTO> load(Long recordId) {
        CoreTranslateLanguageDTO coreTranslateLanguageDTO = coreFilterRequestDTO.getCoreTranslateLanguageDTO() != null ? coreFilterRequestDTO.getCoreTranslateLanguageDTO() : userSecurity.getCoreTranslateLanguageDTO();
        CoreServiceBaseEntity coreServiceBaseForm = service.get(1);
        if (coreServiceBaseForm instanceof CoreServiceDTOForm coreServiceDTOForm) {
            Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(recordId);
            if (coreWindowTabDTOOptional.isPresent()) {
                CoreFilterAssignElementMasterDTO coreFilterAssignElementMasterDTO = new CoreFilterAssignElementMasterDTO();
                FilterUtil.createCoreFilterAssignElementMasterDTO(coreServiceDTOForm, coreWindowTabDTOOptional.get(), coreTranslateLanguageDTO, this, coreFilterAssignElementMasterDTO, userSecurity);
                return List.of(coreFilterAssignElementMasterDTO);
            }
        }
        return null;
    }
}

package org.infra.reactive.form.engine.form.engine.providers.filter.elements.column;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignElementMasterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderConstant;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;

import java.util.List;
import java.util.Optional;

@CoreFilterProviderJavaServiceRegistry(registerKey = CoreFilterProviderConstant.registerKey_column)
public class FilterColumnProviderJava extends CoreFilterProviderJavaServiceAbstract<CoreFilterAssignElementMasterDTO, CoreServiceBaseEntity> {

    public FilterColumnProviderJava(CoreUserAuthenticateRequestDTO userSecurity, CoreFilterRequestDTO coreFilterRequestDTO, CoreFilterProviderDTO coreFilterProviderDTO) {
        super(userSecurity, coreFilterRequestDTO, coreFilterProviderDTO);
    }

    @Override
    public List<CoreFilterAssignElementMasterDTO> load(Long recordId) {
        CoreTranslateLanguageDTO coreTranslateLanguageDTO = coreFilterRequestDTO.getCoreTranslateLanguageDTO() != null ? coreFilterRequestDTO.getCoreTranslateLanguageDTO() : userSecurity.getCoreTranslateLanguageDTO();
        Optional<CoreTableColumnDTO> coreTableColumnDTOOptional = CoreServiceDTOTable.coreTableColumnDTOLRUCache.get(recordId);
        return coreTableColumnDTOOptional.map(coreTableColumnDTO -> {
            return List.of(new CoreFilterAssignElementMasterDTO());
        }).orElse(List.of(new CoreFilterAssignElementMasterDTO()));
    }
}

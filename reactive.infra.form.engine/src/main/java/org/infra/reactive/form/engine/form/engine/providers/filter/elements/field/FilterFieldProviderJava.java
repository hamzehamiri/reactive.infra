package org.infra.reactive.form.engine.form.engine.providers.filter.elements.field;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.field.CoreFilterAssignElementMasterFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.providers.filter.elements.FilterUtil;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderConstant;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CoreFilterProviderJavaServiceRegistry(registerKey = CoreFilterProviderConstant.registerKey_field)
public class FilterFieldProviderJava extends CoreFilterProviderJavaServiceAbstract<CoreFilterAssignElementMasterFieldDTO, CoreServiceBaseEntity> {

    public FilterFieldProviderJava(CoreUserAuthenticateRequestDTO userSecurity, CoreFilterRequestDTO coreFilterRequestDTO, CoreFilterProviderDTO coreFilterProviderDTO) {
        super(userSecurity, coreFilterRequestDTO, coreFilterProviderDTO);
    }

    @Override
    public List<CoreFilterAssignElementMasterFieldDTO> load(Long recordId) {
        CoreTranslateLanguageDTO coreTranslateLanguageDTO = coreFilterRequestDTO.getCoreTranslateLanguageDTO() != null ? coreFilterRequestDTO.getCoreTranslateLanguageDTO() : userSecurity.getCoreTranslateLanguageDTO();
        CoreServiceBaseEntity coreServiceBaseForm = service.get(1);
        Optional<CoreWindowTabFieldDTO> coreWindowTabFieldDTOOptional = CoreServiceDTOTable.coreWindowTabFieldDTOLRUCache.get(recordId);
        return coreWindowTabFieldDTOOptional.map(coreWindowTabFieldDTO -> {
            if (coreWindowTabFieldDTO.getCoreTableColumnDTO() != null) {
                if (coreServiceBaseForm instanceof CoreServiceDTOForm coreServiceDTOForm) {
                    CoreTableColumnDataProviderDTO dataProvider = ConvertUtil.getDataProviderFromField(coreWindowTabFieldDTO);

                    List<CoreFilterAssignElementMasterFieldDTO> coreFilterAssignElementMasterFieldDTOList = new ArrayList<>();

                    if (dataProvider != null) {
                        Optional<CoreTableColumnDataProviderTableDTO> coreTableColumnDataProviderTableDTOOptional = CoreServiceDTOTable.coreTableColumnDataProviderTableDTOLRUCache.get(dataProvider.getCoreTableColumnDataProviderTypeRecordId());
                        if (coreTableColumnDataProviderTableDTOOptional.isPresent()) {
                            CoreTableColumnDataProviderTableDTO coreTableColumnDataProviderTableDTO = coreTableColumnDataProviderTableDTOOptional.get();
                            Optional<List<CoreWindowTabDTO>> core = CoreServiceDTOTable.coreWindowTabDTOByCoreTableIdLRUCache.get(coreTableColumnDataProviderTableDTO.getCoreTableId());
                            if (core.isPresent()) {
                                List<CoreWindowTabDTO> coreWindowTabDTOList = core.get();
                                for (CoreWindowTabDTO coreWindowTabDTO : coreWindowTabDTOList) {
                                    CoreFilterAssignElementMasterFieldDTO coreFilterAssignElementMasterFieldDTO = new CoreFilterAssignElementMasterFieldDTO();
                                    coreFilterAssignElementMasterFieldDTO.setCoreWindowTabDTO(coreWindowTabDTO);
                                    FilterUtil.createCoreFilterAssignElementMasterDTO(coreServiceDTOForm, coreWindowTabDTO, coreTranslateLanguageDTO, this, coreFilterAssignElementMasterFieldDTO, userSecurity);
                                    coreFilterAssignElementMasterFieldDTOList.add(coreFilterAssignElementMasterFieldDTO);
                                }
                            }
                        }
                    }

                    return coreFilterAssignElementMasterFieldDTOList;
                }
            }
            return new ArrayList<CoreFilterAssignElementMasterFieldDTO>();
        }).orElse(new ArrayList<>());
    }
}

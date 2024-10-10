package org.infra.reactive.form.engine.form.engine.providers.filter.service.provider;

import lombok.Getter;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignElementMasterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterProviderDTO;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;

import java.util.Arrays;
import java.util.List;

public abstract class CoreFilterProviderJavaServiceAbstract<T extends CoreFilterAssignElementMasterDTO, SERVICE extends CoreServiceBaseEntity> {

    @Getter
    protected CoreUserAuthenticateRequestDTO userSecurity;
    @Getter
    protected CoreFilterRequestDTO coreFilterRequestDTO;
    @Getter
    protected CoreFilterProviderDTO coreFilterProviderDTO;
    protected List<SERVICE> service;

    public CoreFilterProviderJavaServiceAbstract(CoreUserAuthenticateRequestDTO userSecurity, CoreFilterRequestDTO coreFilterRequestDTO, CoreFilterProviderDTO coreFilterProviderDTO) {
        this.userSecurity = userSecurity;
        this.coreFilterRequestDTO = coreFilterRequestDTO;
        this.coreFilterProviderDTO = coreFilterProviderDTO;
    }

    public void setServices(SERVICE[] services) {
        this.service = Arrays.asList(services);
    }

    public abstract List<T> load(Long recordId);
}

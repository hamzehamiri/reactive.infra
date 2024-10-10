package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignElementMasterDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOFilter;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping(ERPConstants.key_base + "/filter")
public class FilterControllerAPI {

    private final CoreServiceDTOFilter coreServiceDTOFilter;

    public FilterControllerAPI(CoreServiceDTOFilter coreServiceDTOFilter) {
        this.coreServiceDTOFilter = coreServiceDTOFilter;
    }

    @PostMapping(path = "/load")
    public Flux<List<CoreFilterAssignElementMasterDTO>> load(@RequestBody CoreFilterRequestDTO coreFilterRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOFilter.load_WithCheckCache(coreFilterRequestDTO, userSecurity);
        });
    }
}

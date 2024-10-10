package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.menu.CoreMenuRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.menu.CoreMenuDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.web.exception.ERPBaseController;
import org.infra.reactive.web.exception.WebExceptionHandlerERP;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping(ERPConstants.key_base + "/menu")
public class MenuControllerAPI extends ERPBaseController {

    private final CoreServiceDTOForm coreServiceDTOForm;

    public MenuControllerAPI(WebExceptionHandlerERP webExceptionHandlerERP, CoreServiceDTOForm coreServiceDTOForm) {
        super(webExceptionHandlerERP);
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @PostMapping(path = "/menu-search-data"/*, produces = MediaType.TEXT_EVENT_STREAM_VALUE*/)
    public Mono<List<CoreMenuDTO>> menuList(@RequestBody CoreMenuRequestDTO coreMenuRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMap(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.menuList_WithCheckCache(userSecurity, coreMenuRequestDTO);
        });
    }
}

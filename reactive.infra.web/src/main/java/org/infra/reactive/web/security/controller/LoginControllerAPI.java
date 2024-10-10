package org.infra.reactive.web.security.controller;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.CoreUserAuthenticateResponseDTO;
import org.infra.reactive.form.engine.form.engine.security.service.AuthTokenServiceImpl;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityAttributeHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(AuthTokenServiceImpl.mainPathSecurity)
public class LoginControllerAPI {

    private final AuthTokenServiceImpl authTokenService;

    public LoginControllerAPI(AuthTokenServiceImpl authTokenService) {
        this.authTokenService = authTokenService;
    }

    @PostMapping(AuthTokenServiceImpl.loginSecurity)
    public Mono<CoreUserAuthenticateResponseDTO> login(ServerWebExchange exchange, @RequestBody CoreUserAuthenticateRequestDTO userLoginRequest) {
        return ReactiveSecurityAttributeHolder.saveLang(exchange, userLoginRequest.getCoreTranslateLanguageDTO())
                .then(authTokenService.login(userLoginRequest));
    }

}

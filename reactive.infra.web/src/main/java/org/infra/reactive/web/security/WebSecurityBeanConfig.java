package org.infra.reactive.web.security;

import org.infra.reactive.form.engine.form.engine.security.service.AuthTokenServiceImpl;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebSecurityBeanConfig {

    @Bean
    public AuthTokenServiceImpl createAuthService(CoreServiceDTOForm coreServiceDTOForm) {
        AuthTokenServiceImpl loginService = new AuthTokenServiceImpl(AuthTokenServiceImpl.keySecret, 20, coreServiceDTOForm);
        return loginService;
    }
}

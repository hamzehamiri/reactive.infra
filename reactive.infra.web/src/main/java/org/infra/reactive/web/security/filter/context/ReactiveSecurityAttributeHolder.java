package org.infra.reactive.web.security.filter.context;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.utils.map.ConvertModelToMapUtil;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Map;

public class ReactiveSecurityAttributeHolder {

    private static final String SECURITY_CONTEXT_KEY = "SPRING_SECURITY_CONTEXT";
    private static final String LANG_CONTEXT_KEY = "SPRING_SECURITY_LANG_CONTEXT";
    private static final CoreUserAuthenticateRequestDTO ANONYMOUS = new CoreUserAuthenticateRequestDTO();

    public static WebErpSecurityContext toWebErpSecurityContext(Map<String, Object> claimHashMap) {
        return new WebErpSecurityContext(ConvertModelToMapUtil.convert(CoreUserAuthenticateRequestDTO.class, claimHashMap));
    }

    public static Mono<Void> saveLang(ServerWebExchange exchange, CoreTranslateLanguageDTO coreTranslateLanguageMetadataDTO) {
        return Mono.fromRunnable(() -> {
            Map<String, Object> attributes = exchange.getAttributes();
            if (coreTranslateLanguageMetadataDTO == null) {
                attributes.remove(LANG_CONTEXT_KEY);
            } else {
                attributes.put(LANG_CONTEXT_KEY, coreTranslateLanguageMetadataDTO);
            }
        });
    }

    public static Mono<CoreTranslateLanguageDTO> loadLang(ServerWebExchange exchange) {
        return Mono.fromCallable(() -> {
            CoreTranslateLanguageDTO securityContext = (CoreTranslateLanguageDTO) exchange.getAttributes().get(LANG_CONTEXT_KEY);
            return securityContext;
//            return Objects.requireNonNullElseGet(securityContext, CoreTranslateLanguageDTO::new);
        });
    }

    public static Mono<Void> saveAuth(ServerWebExchange exchange, Map<String, Object> userAuthHashMapField) {
        return saveAuth(exchange, toWebErpSecurityContext(userAuthHashMapField));
    }

    public static Mono<Void> saveAuth(ServerWebExchange exchange, WebErpSecurityContext securityContext) {
        return Mono.fromRunnable(() -> {
            final Map<String, Object> attributes = exchange.getAttributes();
            if (securityContext == null) {
                attributes.remove(SECURITY_CONTEXT_KEY);
            } else {
                attributes.put(SECURITY_CONTEXT_KEY, securityContext);
            }
        });
    }

    public static Mono<WebErpSecurityContext> loadAuth(ServerWebExchange exchange) {
        return Mono.fromCallable(() -> {
            WebErpSecurityContext securityContext = (WebErpSecurityContext) exchange.getAttributes().get(SECURITY_CONTEXT_KEY);
            return securityContext;
//            return Objects.requireNonNullElseGet(securityContext, () -> new WebErpSecurityContext(ANONYMOUS));
        });
    }

}

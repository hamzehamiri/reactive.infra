package org.infra.reactive.web.security.filter.context;

import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.util.function.Function;

public class ReactiveSecurityContextHolder {
    public static final String SECURITY_CONTEXT_KEY = WebErpSecurityContext.class.getName();
    public static final String LANG_CONTEXT_KEY = CoreTranslateLanguageDTO.class.getName();

    public static Mono<WebErpSecurityContext> loadAuth() {
        return Mono.deferContextual(contextView -> {
            Mono<WebErpSecurityContext> securityContext = contextView.get(SECURITY_CONTEXT_KEY);
            return securityContext;
        });
    }

    public static Mono<CoreTranslateLanguageDTO> loadLang() {
        return Mono.deferContextual(contextView -> {
            Mono<CoreTranslateLanguageDTO> langContext = contextView.get(LANG_CONTEXT_KEY);
            return langContext;
        });
    }

    public static Function<Context, Context> clearSecurityContext() {
        return context -> context.delete(SECURITY_CONTEXT_KEY);
    }

    public static Function<Context, Context> clearLangContext() {
        return context -> context.delete(SECURITY_CONTEXT_KEY);
    }

    public static Context saveAuth(Mono<? extends WebErpSecurityContext> securityContext, Context context) {
        return context.put(SECURITY_CONTEXT_KEY, securityContext);
    }

    public static Context saveLang(Mono<CoreTranslateLanguageDTO> langContext, Context context) {
        return context.put(LANG_CONTEXT_KEY, langContext);
    }
}

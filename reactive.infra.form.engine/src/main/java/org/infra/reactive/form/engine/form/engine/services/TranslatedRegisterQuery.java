package org.infra.reactive.form.engine.form.engine.services;

import java.util.concurrent.ConcurrentHashMap;

public class TranslatedRegisterQuery {
    private static ConcurrentHashMap<String, Class<? extends TranslateQueryJoiner>> registerAllTranslate = new ConcurrentHashMap<>(1000);

    public static void RegisterQueryJoiner(String registerKey, Class<? extends TranslateQueryJoiner> translateQueryJoiner) {
        registerAllTranslate.put(registerKey, translateQueryJoiner);
    }

    public static Class<? extends TranslateQueryJoiner> getQueryJoiner(String registerKey) {
        return registerAllTranslate.get(registerKey);
    }
}

package org.infra.reactive.form.engine.form.engine.exception;

import org.infra.reactive.form.engine.cache.lru.LRUCache;

public class ExceptionLogParser {
    private static ExceptionLogParser exceptionLogParser;

    public static ExceptionLogParser Instance() {
        if (exceptionLogParser == null)
            exceptionLogParser = new ExceptionLogParser();
        return exceptionLogParser;
    }

    private LRUCache<Class<?>, String> lruCache;

    private ExceptionLogParser() {
        lruCache = new LRUCache<>(1000);
    }

//    public void addRegister(Class<?> registerClassModel , )
}

package org.infra.reactive.web.webdavnew.common;

import org.springframework.util.LinkedCaseInsensitiveMap;

public class Properties extends LinkedCaseInsensitiveMap<Object> {

    public Properties() {
        super();
    }

    Properties(final Properties properties) {
        super();
        this.putAll(properties);
    }

    @Override
    public Properties clone() {
        return new Properties(this);
    }
}
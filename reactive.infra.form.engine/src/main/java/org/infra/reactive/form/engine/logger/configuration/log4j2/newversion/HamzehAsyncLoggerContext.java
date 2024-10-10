package org.infra.reactive.form.engine.logger.configuration.log4j2.newversion;


import org.apache.logging.log4j.core.Logger;
import org.apache.logging.log4j.core.async.AsyncLoggerContext;

import java.net.URI;

public class HamzehAsyncLoggerContext extends AsyncLoggerContext {
    public HamzehAsyncLoggerContext(String name) {
        super(name);
    }

    public HamzehAsyncLoggerContext(String name, Object externalContext) {
        super(name, externalContext);
    }

    public HamzehAsyncLoggerContext(String name, Object externalContext, URI configLocn) {
        super(name, externalContext, configLocn);
    }

    public HamzehAsyncLoggerContext(String name, Object externalContext, String configLocn) {
        super(name, externalContext, configLocn);
    }

    @Override
    public Logger getLogger(String name) {
        return super.getLogger(name);
    }
}

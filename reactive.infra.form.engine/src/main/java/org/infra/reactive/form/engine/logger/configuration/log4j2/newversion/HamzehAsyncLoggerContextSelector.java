package org.infra.reactive.form.engine.logger.configuration.log4j2.newversion;

import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.async.AsyncLoggerContextSelector;

import java.net.URI;

public class HamzehAsyncLoggerContextSelector extends AsyncLoggerContextSelector {

    @Override
    protected LoggerContext createContext(String name, URI configLocation) {
        return new HamzehAsyncLoggerContext(name, configLocation);
    }
}

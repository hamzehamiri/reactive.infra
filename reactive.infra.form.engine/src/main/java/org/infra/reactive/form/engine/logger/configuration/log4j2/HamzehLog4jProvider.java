package org.infra.reactive.form.engine.logger.configuration.log4j2;

import org.apache.logging.log4j.spi.Provider;
import org.infra.reactive.form.engine.logger.configuration.log4j2.newversion.HamzehLog4jContextFactory;
import org.infra.reactive.form.engine.logger.configuration.log4j2.old.CustomLoggerContextFactory;

public class HamzehLog4jProvider extends Provider {
    public HamzehLog4jProvider() {
        super(16, "2.6.0", HamzehLog4jContextFactory.class);
    }
}

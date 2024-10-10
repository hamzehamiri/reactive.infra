package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.impl.Log4jContextFactory;

public class CustomLoggerContextFactoryNew extends Log4jContextFactory {

    public LoggerContext getContext(final String fqcn, final ClassLoader loader, final Object externalContext, final boolean currentContext) {
        CustomLoggerContext context = new CustomLoggerContext(fqcn);
        context.setConfiguration(new CustomConfiguration(context));
        return context;
    }
}

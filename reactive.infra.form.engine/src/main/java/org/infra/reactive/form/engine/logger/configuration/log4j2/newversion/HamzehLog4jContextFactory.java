package org.infra.reactive.form.engine.logger.configuration.log4j2.newversion;

import org.apache.logging.log4j.core.impl.Log4jContextFactory;
import org.apache.logging.log4j.core.selector.ContextSelector;
import org.apache.logging.log4j.core.util.DefaultShutdownCallbackRegistry;
import org.apache.logging.log4j.core.util.Loader;
import org.apache.logging.log4j.core.util.ShutdownCallbackRegistry;

public class HamzehLog4jContextFactory extends Log4jContextFactory {
    public HamzehLog4jContextFactory() {
        super(createContextSelector());
    }

    public HamzehLog4jContextFactory(final ContextSelector selector) {
        this(selector, createShutdownCallbackRegistry());
    }

    public HamzehLog4jContextFactory(ContextSelector selector, ShutdownCallbackRegistry shutdownCallbackRegistry) {
        super(selector, shutdownCallbackRegistry);
    }

    private static ContextSelector createContextSelector() {
        ContextSelector contextSelector = new HamzehAsyncLoggerContextSelector();
        return contextSelector;
    }

    private static ShutdownCallbackRegistry createShutdownCallbackRegistry() {
        try {
            final ShutdownCallbackRegistry registry = Loader.newCheckedInstanceOfProperty(ShutdownCallbackRegistry.SHUTDOWN_CALLBACK_REGISTRY, ShutdownCallbackRegistry.class);
            if (registry != null) {
                return registry;
            }
        } catch (Exception e) {
        }
        return new DefaultShutdownCallbackRegistry();
    }
}

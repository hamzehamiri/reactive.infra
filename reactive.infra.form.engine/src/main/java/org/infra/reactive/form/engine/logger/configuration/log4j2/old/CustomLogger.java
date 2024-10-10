package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.core.Logger;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.message.MessageFactory;

public class CustomLogger extends Logger {

    public CustomLogger(LoggerContext context, String name) {
        super(context, name, null);
    }

    public CustomLogger(LoggerContext context, String name, MessageFactory messageFactory) {
        super(context, name, messageFactory);
    }

    @Override
    public void error(String message) {
        super.error(message);
        System.out.println("Joke");
    }
}

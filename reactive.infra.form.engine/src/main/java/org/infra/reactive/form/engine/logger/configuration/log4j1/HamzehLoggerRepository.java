package org.infra.reactive.form.engine.logger.configuration.log4j1;

import org.apache.log4j.Appender;
import org.apache.log4j.Category;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.spi.HierarchyEventListener;
import org.apache.log4j.spi.LoggerFactory;
import org.apache.log4j.spi.LoggerRepository;


import java.util.Enumeration;
import java.util.Vector;

public class HamzehLoggerRepository implements LoggerRepository {
    public void addHierarchyEventListener(final HierarchyEventListener listener) {
    }

    public boolean isDisabled(final int level) {
        return false;
    }

    public void setThreshold(final Level level) {
    }

    public void setThreshold(final String val) {
    }

    public void emitNoAppenderWarning(final Category cat) {
    }

    public Level getThreshold() {
        return Level.OFF;
    }

    public Logger getLogger(final String name) {
        return new HamzehLogger(this, name);
    }

    public Logger getLogger(final String name, final LoggerFactory factory) {
        return new HamzehLogger(this, name);
    }

    public Logger getRootLogger() {
        return new HamzehLogger(this, "root");
    }

    public Logger exists(final String name) {
        return null;
    }

    public void shutdown() {
    }

    public Enumeration getCurrentLoggers() {
        return new Vector().elements();
    }

    public Enumeration getCurrentCategories() {
        return getCurrentLoggers();
    }

    public void fireAddAppenderEvent(Category logger, Appender appender) {
    }

    public void resetConfiguration() {
    }
}

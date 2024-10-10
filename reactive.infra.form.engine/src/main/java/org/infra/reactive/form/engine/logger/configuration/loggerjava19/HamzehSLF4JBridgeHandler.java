package org.infra.reactive.form.engine.logger.configuration.loggerjava19;//package org.hamzeh.erp.logger.configuration.loggerjava19;
//
//import ch.qos.logback.classic.LoggerContext;
//import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
//import ch.qos.logback.classic.spi.ILoggingEvent;
//import ch.qos.logback.core.FileAppender;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.slf4j.spi.LocationAwareLogger;
//
//import java.text.MessageFormat;
//import java.util.MissingResourceException;
//import java.util.ResourceBundle;
//import java.util.logging.Handler;
//import java.util.logging.Level;
//import java.util.logging.LogManager;
//import java.util.logging.LogRecord;
//
//public class HamzehSLF4JBridgeHandler extends Handler {
//
//    private static final String FQCN = java.util.logging.Logger.class.getName();
//    private static final String UNKNOWN_LOGGER_NAME = "unknown.jul.logger";
//
//    private static final int TRACE_LEVEL_THRESHOLD = Level.FINEST.intValue();
//    private static final int DEBUG_LEVEL_THRESHOLD = Level.FINE.intValue();
//    private static final int INFO_LEVEL_THRESHOLD = Level.INFO.intValue();
//    private static final int WARN_LEVEL_THRESHOLD = Level.WARNING.intValue();
//
//    public static void install() {
//        LogManager.getLogManager().getLogger("").addHandler(new HamzehSLF4JBridgeHandler());
//    }
//
//    private static java.util.logging.Logger getRootLogger() {
//        return LogManager.getLogManager().getLogger("");
//    }
//
//    public static void uninstall() throws SecurityException {
//        java.util.logging.Logger rootLogger = getRootLogger();
//        Handler[] handlers = rootLogger.getHandlers();
//        for (Handler handler : handlers) {
//            if (handler instanceof HamzehSLF4JBridgeHandler) {
//                rootLogger.removeHandler(handler);
//            }
//        }
//    }
//    public static boolean isInstalled() {
//        java.util.logging.Logger rootLogger = getRootLogger();
//        Handler[] handlers = rootLogger.getHandlers();
//        for (Handler handler : handlers) {
//            if (handler instanceof HamzehSLF4JBridgeHandler) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    public static void removeHandlersForRootLogger() {
//        java.util.logging.Logger rootLogger = getRootLogger();
//        java.util.logging.Handler[] handlers = rootLogger.getHandlers();
//        for (Handler handler : handlers) {
//            rootLogger.removeHandler(handler);
//        }
//    }
//
//    public HamzehSLF4JBridgeHandler() {
//    }
//
//    public void close() {
//        // empty
//    }
//
//    public void flush() {
//        // empty
//    }
//
//    protected Logger getSLF4JLogger(LogRecord record) {
//        String name = record.getLoggerName();
//        if (name == null) {
//            name = UNKNOWN_LOGGER_NAME;
//        }
//        return LoggerFactory.getLogger(name);
//    }
//
//    private ch.qos.logback.classic.Logger createLoggerFor(String string, String file) {
//        LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
//
//        PatternLayoutEncoder ple = new PatternLayoutEncoder();
//
//        ple.setPattern("%date %level [%thread] %logger{10} [%file:%line] %msg%n");
//        ple.setContext(lc);
//        ple.start();
//        FileAppender<ILoggingEvent> fileAppender = new FileAppender<ILoggingEvent>();
//        fileAppender.setFile(file);
//        fileAppender.setEncoder(ple);
//        fileAppender.setContext(lc);
//        fileAppender.start();
//
//        ch.qos.logback.classic.Logger logger = (ch.qos.logback.classic.Logger)LoggerFactory.getLogger(string);
//        logger.addAppender(fileAppender);
//        logger.setLevel(ch.qos.logback.classic.Level .DEBUG);
//        logger.setAdditive(false); /* set to true if root should log too */
//
//        return logger;
//    }
//
//    protected void callLocationAwareLogger(LocationAwareLogger lal, LogRecord record) {
//        int julLevelValue = record.getLevel().intValue();
//        int slf4jLevel;
//
//        if (julLevelValue <= TRACE_LEVEL_THRESHOLD) {
//            slf4jLevel = LocationAwareLogger.TRACE_INT;
//        } else if (julLevelValue <= DEBUG_LEVEL_THRESHOLD) {
//            slf4jLevel = LocationAwareLogger.DEBUG_INT;
//        } else if (julLevelValue <= INFO_LEVEL_THRESHOLD) {
//            slf4jLevel = LocationAwareLogger.INFO_INT;
//        } else if (julLevelValue <= WARN_LEVEL_THRESHOLD) {
//            slf4jLevel = LocationAwareLogger.WARN_INT;
//        } else {
//            slf4jLevel = LocationAwareLogger.ERROR_INT;
//        }
//        String i18nMessage = getMessageI18N(record);
//        lal.log(null, FQCN, slf4jLevel, i18nMessage, null, record.getThrown());
//    }
//
//    protected void callPlainSLF4JLogger(Logger slf4jLogger, LogRecord record) {
//        String i18nMessage = getMessageI18N(record);
//        int julLevelValue = record.getLevel().intValue();
//        if (julLevelValue <= TRACE_LEVEL_THRESHOLD) {
//            slf4jLogger.trace(i18nMessage, record.getThrown());
//        } else if (julLevelValue <= DEBUG_LEVEL_THRESHOLD) {
//            slf4jLogger.debug(i18nMessage, record.getThrown());
//        } else if (julLevelValue <= INFO_LEVEL_THRESHOLD) {
//            slf4jLogger.info(i18nMessage, record.getThrown());
//        } else if (julLevelValue <= WARN_LEVEL_THRESHOLD) {
//            slf4jLogger.warn(i18nMessage, record.getThrown());
//        } else {
//            slf4jLogger.error(i18nMessage, record.getThrown());
//        }
//    }
//
//    private String getMessageI18N(LogRecord record) {
//        String message = record.getMessage();
//
//        if (message == null) {
//            return null;
//        }
//
//        ResourceBundle bundle = record.getResourceBundle();
//        if (bundle != null) {
//            try {
//                message = bundle.getString(message);
//            } catch (MissingResourceException e) {
//            }
//        }
//        Object[] params = record.getParameters();
//        if (params != null && params.length > 0) {
//            try {
//                message = MessageFormat.format(message, params);
//            } catch (IllegalArgumentException e) {
//                return message;
//            }
//        }
//        return message;
//    }
//
//    public void publish(LogRecord record) {
//        if (record == null) {
//            return;
//        }
//        Logger slf4jLogger = getSLF4JLogger(record);
//        if (record.getMessage() == null) {
//            record.setMessage("");
//        }
//        if (slf4jLogger instanceof LocationAwareLogger) {
//            callLocationAwareLogger((LocationAwareLogger) slf4jLogger, record);
//        } else {
//            callPlainSLF4JLogger(slf4jLogger, record);
//        }
//    }
//}

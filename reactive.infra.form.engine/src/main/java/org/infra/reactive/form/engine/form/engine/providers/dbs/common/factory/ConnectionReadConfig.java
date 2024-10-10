package org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConnectionReadConfig {
    public static Properties readFile(String fileName) {
        Properties prop = new Properties();
        try {
            InputStream input = ConnectionReadConfig.class.getClassLoader().getResourceAsStream(fileName);
            prop.load(input);
            return prop;
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}

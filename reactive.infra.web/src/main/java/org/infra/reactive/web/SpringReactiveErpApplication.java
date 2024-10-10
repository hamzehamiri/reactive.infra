package org.infra.reactive.web;

import org.infra.reactive.form.engine.logger.configuration.log4j2.old.StartLog4jV2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration;
import org.springframework.boot.autoconfigure.neo4j.Neo4jAutoConfiguration;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {R2dbcAutoConfiguration.class,
        SecurityAutoConfiguration.class,
        ReactiveSecurityAutoConfiguration.class,
        MongoReactiveAutoConfiguration.class,
        Neo4jAutoConfiguration.class})
public class SpringReactiveErpApplication {

    public static void main(String[] args) {
        StartLog4jV2.initializeYourLogger("Jasper.log", "%d %p %c [%t] %m%n");
//        StartLog4jV1.StartCustomService();
//        HamzehSLF4JBridgeHandler.install();

        SpringApplication.run(SpringReactiveErpApplication.class, args);
    }

}

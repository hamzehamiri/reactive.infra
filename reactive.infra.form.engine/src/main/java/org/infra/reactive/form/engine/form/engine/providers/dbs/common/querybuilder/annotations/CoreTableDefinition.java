package org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
public @interface CoreTableDefinition {
    String tableName();
    String register_key() default "infra";
}

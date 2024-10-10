package org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({METHOD, FIELD})
@Retention(RUNTIME)
public @interface CoreColumnDefinition {
    String columnName() default "";

    boolean isPk() default false;

    CoreColumnType columnType();

    String sequenceName() default "";
}

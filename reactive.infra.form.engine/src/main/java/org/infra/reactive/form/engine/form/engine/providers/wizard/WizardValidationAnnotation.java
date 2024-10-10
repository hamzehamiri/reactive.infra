package org.infra.reactive.form.engine.form.engine.providers.wizard;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
public @interface WizardValidationAnnotation {
    String registerKey() default "";
}

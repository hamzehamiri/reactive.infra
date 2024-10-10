package org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider;


import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
public @interface DataProviderJavaRegistry {
    String serviceKeyRegister() default "";

    CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() default CoreTableColumnDataProviderTypeEnum.Primary;
}

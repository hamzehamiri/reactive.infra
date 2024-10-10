package org.infra.reactive.form.engine.form.engine.providers.websocket;


import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
public @interface WebSocketClassRegister {
    String serviceKeyRegister();
    Class<?> classRes();
    Class<?> classReq();
}

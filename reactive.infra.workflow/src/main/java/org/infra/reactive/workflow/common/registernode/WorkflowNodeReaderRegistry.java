package org.infra.reactive.workflow.common.registernode;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
public @interface WorkflowNodeReaderRegistry {
    String registerKey() default "";

    WorkflowNodeReaderEngineEnum workFlowType() default WorkflowNodeReaderEngineEnum.Camunda;
}

package org.infra.reactive.workflow;

import lombok.Data;

import java.util.Map;

@Data
public class WorkFlowExecutionContext {
    private Map<String, Object> targetData;
}

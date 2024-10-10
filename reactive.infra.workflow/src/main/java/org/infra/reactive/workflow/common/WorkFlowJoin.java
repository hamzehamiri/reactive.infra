package org.infra.reactive.workflow.common;

import lombok.Data;

@Data
public class WorkFlowJoin {
    private String id;
    private AbstractWorkFlowScanChildNode out;
    private AbstractWorkFlowScanChildNode in;
}

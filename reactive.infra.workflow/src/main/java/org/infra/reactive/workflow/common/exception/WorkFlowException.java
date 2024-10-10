package org.infra.reactive.workflow.common.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;

@EqualsAndHashCode(callSuper = true)
@Data
public class WorkFlowException extends Exception {
    private int errorCode;
    private String originalException;
    private AbstractWorkFlowScanChildNode abstractWorkFlowScanChildNode;

    public WorkFlowException() {

    }

    public WorkFlowException(int errorCode, String originalException, AbstractWorkFlowScanChildNode abstractWorkFlowScanChildNode) {
        this.errorCode = errorCode;
        this.originalException = originalException;
        this.abstractWorkFlowScanChildNode = abstractWorkFlowScanChildNode;
    }

}

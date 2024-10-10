package org.infra.reactive.workflow.common.context;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.providers.common.AbstractListener;
import org.infra.reactive.workflow.common.AbstractWorkFlowScanChildNode;

@EqualsAndHashCode(callSuper = true)
@Data
public class WorkFlowContext extends AbstractListener<String, AbstractWorkFlowScanChildNode> {
    private String id;
    private String versionId;
}

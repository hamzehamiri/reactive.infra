package org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.jackson.CoreFilterRequestElementInterfaceDeserialize;

@JsonDeserialize(using = CoreFilterRequestElementInterfaceDeserialize.class)
public interface CoreFilterRequestElementInterface {
    public static final String dataModelRegistryPropName = "dataModelRegistry";
    public static final String registerKey_ElementWithOperand = "ElementWithOperand";
    public static final String registerKey_ElementWithOperationParamValue = "ElementWithOperationParamValue";
    String getDataModelRegistry();
}

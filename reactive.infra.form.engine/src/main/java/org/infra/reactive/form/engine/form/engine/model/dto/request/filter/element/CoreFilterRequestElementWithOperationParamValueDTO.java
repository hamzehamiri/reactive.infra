package org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.model.CoreFilterProviderRequestModelRegistry;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@CoreFilterProviderRequestModelRegistry(registerKey = CoreFilterRequestElementInterface.registerKey_ElementWithOperationParamValue)
public class CoreFilterRequestElementWithOperationParamValueDTO implements CoreFilterRequestElementInterface {
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private Long coreFilterOperationId;
    private Map<Long, DataProviderAbstract<?, ?>> operationParamValueMap;

    @Override
    public String getDataModelRegistry() {
        return CoreFilterRequestElementInterface.registerKey_ElementWithOperationParamValue;
    }
}

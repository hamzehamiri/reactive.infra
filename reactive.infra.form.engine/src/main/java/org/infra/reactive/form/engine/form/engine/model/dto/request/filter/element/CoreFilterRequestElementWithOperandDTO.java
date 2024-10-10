package org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestOperandEnum;
import org.infra.reactive.form.engine.form.engine.providers.filter.model.CoreFilterProviderRequestModelRegistry;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@CoreFilterProviderRequestModelRegistry(registerKey = CoreFilterRequestElementInterface.registerKey_ElementWithOperand)
public class CoreFilterRequestElementWithOperandDTO implements CoreFilterRequestElementInterface {
    private List<CoreFilterRequestElementInterface> coreFilterRequestElementValueInterfaceList;
    private CoreFilterRequestOperandEnum coreFilterRequestOperandEnum;

    @Override
    public String getDataModelRegistry() {
        return CoreFilterRequestElementInterface.registerKey_ElementWithOperand;
    }
}

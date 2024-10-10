package org.infra.reactive.web.formengine.modules.dataprovider;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.table.DataProviderTableKeyValueDTO;

@DataProviderJavaRegistry(serviceKeyRegister = "CoreTableSerializer")
public class CoreTableSerializer extends DataProviderTableKeyValueDTO {
    public CoreTableSerializer(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }
}

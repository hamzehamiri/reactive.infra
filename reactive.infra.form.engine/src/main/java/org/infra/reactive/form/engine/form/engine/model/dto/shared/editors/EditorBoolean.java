package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

public class EditorBoolean extends DataProviderAbstract<String, String> {

    public EditorBoolean() {

    }

    @Override
    public String getDisplay() {
        return super.getKey();
    }
}

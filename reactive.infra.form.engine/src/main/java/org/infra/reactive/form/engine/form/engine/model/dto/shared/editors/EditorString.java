package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

public class EditorString extends DataProviderAbstract<String, String> {

    public EditorString() {

    }

    @Override
    public String getDisplay() {
        return super.getKey();
    }
}

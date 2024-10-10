package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

public class EditorLong extends DataProviderAbstract<Long, Long> {

    public EditorLong() {

    }

    @Override
    public String getDisplay() {
        return getKey() != null ? getKey().toString() : "";
    }

}

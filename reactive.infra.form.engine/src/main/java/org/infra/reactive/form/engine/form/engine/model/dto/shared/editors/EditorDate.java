package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

import java.time.LocalDateTime;

public class EditorDate extends DataProviderAbstract<EditorDateDTO, LocalDateTime> {

    public EditorDate() {

    }

    @Override
    public String getDisplay() {
        if (getKey() != null) {
            return getKey().toString();
        } else {
            return "";
        }
    }
}

package org.infra.reactive.form.engine.form.engine.model.tables;

import java.io.Serializable;

public interface BaseEntityInterface<TYPE> extends Serializable {
    TYPE getId();
}

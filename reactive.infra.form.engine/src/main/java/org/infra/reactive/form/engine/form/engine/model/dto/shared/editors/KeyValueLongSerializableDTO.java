package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
public class KeyValueLongSerializableDTO extends KeyValueDTO<Long, Serializable> {
}

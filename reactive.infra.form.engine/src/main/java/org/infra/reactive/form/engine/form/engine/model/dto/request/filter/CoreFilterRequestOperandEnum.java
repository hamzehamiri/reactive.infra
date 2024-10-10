package org.infra.reactive.form.engine.form.engine.model.dto.request.filter;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.jackson.CoreFilterRequestOperandEnumDeSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.jackson.CoreFilterRequestOperandEnumSerializer;

@JsonSerialize(using = CoreFilterRequestOperandEnumSerializer.class)
@JsonDeserialize(using = CoreFilterRequestOperandEnumDeSerializer.class)
public enum CoreFilterRequestOperandEnum {
    AND("and"),
    OR("or"),
    NOT("not"),
    NOTNULL("notnull");

    private final String key;

    CoreFilterRequestOperandEnum(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return this.key;
    }
}

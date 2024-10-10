package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.jackson.CoreWindowTabFieldSortOrderProfileDTOJacksonDeSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.jackson.CoreWindowTabFieldSortOrderProfileDTOJacksonSerializer;

@JsonSerialize(using = CoreWindowTabFieldSortOrderProfileDTOJacksonSerializer.class)
@JsonDeserialize(using = CoreWindowTabFieldSortOrderProfileDTOJacksonDeSerializer.class)
public enum CoreWindowTabFieldSortOrderProfileDTO {
    None("none"),
    Asc("asc"),
    Desc("desc");

    private final String key;

    CoreWindowTabFieldSortOrderProfileDTO(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return key;
    }
}

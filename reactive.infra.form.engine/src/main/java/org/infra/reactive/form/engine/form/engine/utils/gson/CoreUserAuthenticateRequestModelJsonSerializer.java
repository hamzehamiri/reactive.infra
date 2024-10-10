package org.infra.reactive.form.engine.form.engine.utils.gson;

import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;

import java.lang.reflect.Type;

public class CoreUserAuthenticateRequestModelJsonSerializer extends BaseSerializer<CoreUserAuthenticateRequestDTO> implements JsonSerializer<CoreUserAuthenticateRequestDTO> {
    @Override
    public JsonElement serialize(CoreUserAuthenticateRequestDTO coreRoleMetaData, Type type, JsonSerializationContext jsonSerializationContext) {
        return convert(coreRoleMetaData, jsonSerializationContext);
    }
}

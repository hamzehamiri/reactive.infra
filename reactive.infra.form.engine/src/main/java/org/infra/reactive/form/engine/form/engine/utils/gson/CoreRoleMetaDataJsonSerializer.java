package org.infra.reactive.form.engine.form.engine.utils.gson;

import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;

import java.lang.reflect.Type;

public class CoreRoleMetaDataJsonSerializer extends BaseSerializer<CoreRoleEntity> implements JsonSerializer<CoreRoleEntity> {
    @Override
    public JsonElement serialize(CoreRoleEntity src, Type typeOfSrc, JsonSerializationContext context) {
        return convert(src, context);
    }
}

package org.infra.reactive.form.engine.form.engine.utils.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;

import java.lang.reflect.Type;

public class GsonInstanceBuilder {

    private static GsonBuilder gsonBuilder;

    static {
        Builder().registerTypeAdapter(CoreUserAuthenticateRequestDTO.class, new CoreUserAuthenticateRequestModelJsonSerializer());
        Builder().registerTypeAdapter(CoreRoleEntity.class, new CoreRoleMetaDataJsonSerializer());
    }

    public static GsonBuilder Builder() {
        if (gsonBuilder == null) {
            gsonBuilder = new GsonBuilder();
        }
        return gsonBuilder;
    }

    public GsonInstanceBuilder registerTypeAdapter(Type type, Object typeAdapter) {
        Builder().registerTypeAdapter(type, typeAdapter);
        return this;
    }

    public Gson create() {
        return Builder().create();
    }
}

package org.infra.reactive.form.engine.form.engine.services;

import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.services.translatejoiners.JoinColumnModelAndColumnAndCriteria;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Map;

public abstract class TranslateQueryJoiner<T extends Serializable> {

    protected static HashSet<String> keyProvider = new HashSet<>();

    public static void addKeyProvider(String key) {
        keyProvider.add(key);
    }

    public abstract void init();

    public abstract Class<T> getClazzDTO();

    public abstract JoinColumnModelAndColumnAndCriteria createTargetElementJoin(TableMetadata fromTable, ColumnMetaModel fromColumn, Map<String, Object> extraParameter);
}

package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.MultiColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.attachment.AttachmentColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.attachment.AttachmentExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.list.ListColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.list.ListExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.PrimaryColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.PrimaryExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;

public class ColumnExpressionPrepareFactory {
    private static ColumnExpressionPrepareFactory instance;

    public static ColumnExpressionPrepareFactory Instance() {
        if (instance == null)
            instance = new ColumnExpressionPrepareFactory();
        return instance;
    }

    static {
        ColumnExpressionPrepareFactory.Instance().register(CoreTableColumnDataProviderTypeEnum.Table, TableExpression.class, TableExpressionPrepare.class);
        ColumnExpressionPrepareFactory.Instance().register(CoreTableColumnDataProviderTypeEnum.List, ListColumnExpression.class, ListExpressionPrepare.class);
        ColumnExpressionPrepareFactory.Instance().register(CoreTableColumnDataProviderTypeEnum.Primary, PrimaryColumnExpression.class, PrimaryExpressionPrepare.class);
        ColumnExpressionPrepareFactory.Instance().register(CoreTableColumnDataProviderTypeEnum.Attachment, AttachmentColumnExpression.class, AttachmentExpressionPrepare.class);
    }

    private Map<CoreTableColumnDataProviderTypeEnum, Class<? extends ColumnExpression>> registerColumnExpressions;
    private Map<CoreTableColumnDataProviderTypeEnum, Class<? extends ColumnExpressionPrepare<? extends ColumnExpression, ? extends Serializable>>> registerColumnExpressionPrepares;

    private ColumnExpressionPrepareFactory() {
        registerColumnExpressions = new HashMap<>();
        registerColumnExpressionPrepares = new HashMap<>();
    }

    public ColumnExpressionPrepareFactory register(CoreTableColumnDataProviderTypeEnum type, Class<? extends ColumnExpression> columnExpression, Class<? extends ColumnExpressionPrepare<?, ?>> columnExpressionPrepare) {
        registerColumnExpressions.put(type, columnExpression);
        registerColumnExpressionPrepares.put(type, columnExpressionPrepare);
        return this;
    }

    public ColumnExpressionPrepare<?, Long> processColumnExpressionPrepare(Mono<Connection> connectionMono,
                                                                           CoreUserAuthenticateRequestDTO userSecurity,
                                                                           CoreTranslateLanguageDTO coreTranslateLanguageDTO,
                                                                           CoreTableColumnDTO coreTableColumnDTO,
                                                                           CoreWindowTabFieldDTO coreWindowTabFieldDTO,
                                                                           TableMetadata tableMetaData,
                                                                           CoreTableColumnDataProviderDTO dataProvider,
                                                                           TableExpression parentTableExpression,
                                                                           TableExpression rootTableExpression,
                                                                           MultiColumnExpressionPrepare<?, ?> parentColumnExpressionPrepare) {
        if (dataProvider != null) {
            DataProviderObjects dataProviderObjects = new DataProviderObjects();
            dataProviderObjects.connectionMono = connectionMono;
            dataProviderObjects.tableMetaData = tableMetaData;
            dataProviderObjects.coreTableColumnDTO = coreTableColumnDTO;
            dataProviderObjects.coreWindowTabFieldDTO = coreWindowTabFieldDTO;
            dataProviderObjects.parentTableExpression = parentTableExpression;
            dataProviderObjects.rootTableExpression = rootTableExpression;
            dataProviderObjects.coreTableColumnDataProviderDTO = dataProvider;
            dataProviderObjects.userSecurity = userSecurity;
            dataProviderObjects.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
            dataProviderObjects.parentColumnExpressionPrepare = parentColumnExpressionPrepare;

            return processColumnExpressionPrepare(dataProviderObjects);
        }
        return null;
    }

    public <T extends ColumnExpressionPrepare<?, ?>> T processColumnExpressionPrepare(DataProviderObjects dataProviderObjects) {
        return factoryExpressionPrepare(dataProviderObjects);
    }


    public <T extends ColumnExpression> T factoryColumnExpression(DataProviderObjects dataProviderObjects) {
        Class<? extends ColumnExpression> colExpression = registerColumnExpressions.get(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().getCoreTableColumnDataProviderTypeEnum());
        try {
            Constructor<? extends ColumnExpression> con = colExpression.getConstructor();
            return (T) con.newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public <T extends ColumnExpressionPrepare<?, ?>> T factoryExpressionPrepare(DataProviderObjects dataProviderObjects) {
        Class<? extends ColumnExpressionPrepare<? extends ColumnExpression, ? extends Serializable>> colExpressionPrepare = registerColumnExpressionPrepares.get(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().getCoreTableColumnDataProviderTypeEnum());
        try {
            Constructor<? extends ColumnExpressionPrepare<? extends ColumnExpression, ? extends Serializable>> con = colExpressionPrepare.getConstructor();
            T instances = (T) con.newInstance();
            instances.setParentColumnExpressionPrepare(dataProviderObjects.parentColumnExpressionPrepare);
            instances.generateColumnExpression(dataProviderObjects);
            instances.generate(dataProviderObjects);
            return instances;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import reactor.core.publisher.Mono;

public class DataProviderObjects {
    public Mono<Connection> connectionMono;
    public TableExpression parentTableExpression;
    public TableExpression rootTableExpression;
    public CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO;
    public CoreUserAuthenticateRequestDTO userSecurity;
    public CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    public CoreWindowTabFieldDTO coreWindowTabFieldDTO;
    public CoreTableColumnDTO coreTableColumnDTO;
    public TableMetadata tableMetaData;
    public MultiColumnExpressionPrepare<?, ?> parentColumnExpressionPrepare;

    public ColumnExpression getColumnExpression() {
        return ConvertUtil.convert(coreTableColumnDTO);
    }
}

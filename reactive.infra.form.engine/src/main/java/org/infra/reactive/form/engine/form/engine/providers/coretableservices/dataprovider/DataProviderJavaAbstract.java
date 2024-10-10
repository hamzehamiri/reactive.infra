package org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider;

import io.r2dbc.spi.Row;
import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementWithRecordIdDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderWithSerializerDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;

public abstract class DataProviderJavaAbstract<CLIENT extends DataProviderAbstract<?, ?>, COL extends ColumnExpression, KEY extends Serializable> {

    @Getter
    protected COL columnExpression;
    @Getter
    @Setter
    protected KEY key;
    @Setter
    protected CoreUserAuthenticateRequestDTO userSecurity;
    @Setter
    protected CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    @Setter
    @Getter
    protected CoreTableColumnDataProviderWithSerializerDTO coreTableColumnDataProviderWithSerializerDTO;
    @Setter
    protected String separatorChar;
    @Setter
    protected CoreAllElementWithRecordIdDTO coreAllElementWithRecordIdDTO;

    public DataProviderJavaAbstract(CoreUserAuthenticateRequestDTO userSecurity) {
        this.userSecurity = userSecurity;
    }

    public void setColumnExpression(COL columnExpression) {
        this.columnExpression = columnExpression;
    }

    public abstract CLIENT convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel);

    public abstract CLIENT convertFromRawData(Object object);

    public abstract CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum();

    public abstract void convertQuery();
}

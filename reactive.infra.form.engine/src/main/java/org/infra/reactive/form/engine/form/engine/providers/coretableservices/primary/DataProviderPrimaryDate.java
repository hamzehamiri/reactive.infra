package org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.calendar.JalaliCalendar;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorDate;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorDateDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@DataProviderJavaRegistry(
        serviceKeyRegister = CoreTableColumnDataProviderSerializerConstant.key_DateTypePrimary,
        coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.Primary
)
public class DataProviderPrimaryDate extends DataProviderJavaAbstract<EditorDate, ColumnExpression, Serializable> {
    public DataProviderPrimaryDate(CoreUserAuthenticateRequestDTO userSecurity) {
        super(userSecurity);
    }

    @Override
    public EditorDate convertJava(Row row, QuerySelectModelWithParamModel querySelectModelWithParamModel) {
        Object data = row.get(columnExpression.getAliasColumnName());
        return convertFromRawData(data);
    }

    @Override
    public EditorDate convertFromRawData(Object data) {
        EditorDate objectWrap = new EditorDate();
        if (data != null) {
            EditorDateDTO dataProviderDateClass;
            int year = 0, month = 0, dayOfMonth = 0, hour = 0, minute = 0, second = 0;
            if (data instanceof LocalDate localDate) {
                year = localDate.getYear();
                month = localDate.getMonthValue();
                dayOfMonth = localDate.getDayOfMonth();

                objectWrap.setOriginalData(LocalDateTime.of(localDate, LocalTime.of(0, 0, 0)));
            } else if (data instanceof LocalDateTime localDateTime) {
                year = localDateTime.getYear();
                month = localDateTime.getMonthValue();
                dayOfMonth = localDateTime.getDayOfMonth();
                hour = localDateTime.getHour();
                minute = localDateTime.getMinute();
                second = localDateTime.getSecond();
                objectWrap.setOriginalData(localDateTime);
            }

            if (coreTranslateLanguageDTO.getLocaleName().equalsIgnoreCase("fa_IR")) {
                dataProviderDateClass = JalaliCalendar.gregorianToJalali(year, month, dayOfMonth, hour, minute, second);
            } else {
                dataProviderDateClass = new EditorDateDTO(year, month, dayOfMonth, hour, minute, second);
            }
            objectWrap.setKey(dataProviderDateClass);
        }
        objectWrap.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        return objectWrap;
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum() {
        return CoreTableColumnDataProviderTypeEnum.Primary;
    }

    @Override
    public void convertQuery() {

    }
}

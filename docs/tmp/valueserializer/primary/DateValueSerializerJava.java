package org.hamzeh.erp.form.engine.providers.coretableservices.valueserializer.primary;

import org.infra.reactive.form.engine.form.engine.providers.coretableservices.valueserializer.ValueSerializerJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.valueserializer.ValueSerializerJavaRegistry;

import java.util.Date;

@ValueSerializerJavaRegistry(serviceKeyRegister = "Date")
public class DateValueSerializerJava extends ValueSerializerJavaAbstract<Date, Date> {
    @Override
    public Date convertFromDBToClient(Date date) {
        return date;
    }
}

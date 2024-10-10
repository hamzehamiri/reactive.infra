package org.infra.reactive.form.engine.form.engine.services.core.entity;

import java.util.Arrays;
import java.util.Optional;

public enum CoreAllElementRegisterKeyEnum {
    Window("Window"),
    Tab("Tab"),
    Field("Field"),
    Process("Process"),
    CoreProcessParam("CoreProcessParam"),
    Column("Column"),
    Button("Button"),
    Exception("Exception"),
    Dashboard("Dashboard"),
    AnalyticReport("AnalyticReport"),
    Table("Table"),
    CoreMenu("CoreMenu"),
    CoreRole("CoreRole"),
    CoreFilter("CoreFilter"),
    CoreFilterOperation("CoreFilterOperation"),
    CoreFilterOperationParam("CoreFilterOperationParam"),
    CoreFilterProvider("CoreFilterProvider"),
    CoreFilterProviderElement("CoreFilterProviderElement"),
    CoreWindowTab_Toolbar("CoreWindowTab_Toolbar"),
    CoreTableColumnDataProviderListValues("CoreTableColumnDataProviderListValues");

    private final String value;

    CoreAllElementRegisterKeyEnum(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public static Optional<CoreAllElementRegisterKeyEnum> getEnum(String key) {
        return Arrays.stream(values()).filter(coreAllElementRegisterKeyEnum -> coreAllElementRegisterKeyEnum.value.equals(key)).findFirst();
    }
}

package org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider;

public enum CoreTableColumnDataProviderTypeEnum {
    Table(1),
    List(2),
    Primary(3),
    Attachment(4),
    Tree(5);

    private final int key;

    CoreTableColumnDataProviderTypeEnum(int key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return String.valueOf(key);
    }

    public static CoreTableColumnDataProviderTypeEnum findType(int key) {
        for (CoreTableColumnDataProviderTypeEnum value : values()) {
            if (value.key == key)
                return value;
        }
        return null;
    }
}

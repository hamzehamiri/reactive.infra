package org.infra.reactive.form.engine.query.model.common;

import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

@EqualsAndHashCode(callSuper = true)
@Data
@XmlRootElement(name = ColumnModel.TAG_NAME)
public class ColumnModel extends BaseSQLModel implements ColumnInterface {
    public static final String TAG_NAME = "column";

    @XmlAttribute(name = "core_table_id")
    private long core_table_id;
    @XmlAttribute(name = "core_table_column_id")
    private long core_table_column_id;
}

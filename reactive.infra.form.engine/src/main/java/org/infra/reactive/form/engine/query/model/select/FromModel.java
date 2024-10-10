package org.infra.reactive.form.engine.query.model.select;

import jakarta.xml.bind.annotation.XmlAttribute;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

@EqualsAndHashCode(callSuper = true)
@Data
public class FromModel extends BaseSQLModel {
    @XmlAttribute(name = "core_table_id")
    private long core_table_id;
}

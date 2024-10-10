package org.infra.reactive.form.engine.query.model.where;

import jakarta.xml.bind.annotation.XmlAttribute;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

@EqualsAndHashCode(callSuper = true)
@Data
public class SqlLogicalOperatorValue extends BaseSQLModel {
    @XmlAttribute(name = "value")
    private String value;
}

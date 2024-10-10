package org.infra.reactive.form.engine.query.model.order;

import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;
import org.infra.reactive.form.engine.query.model.common.ColumnModel;

@EqualsAndHashCode(callSuper = true)
@Data
public class OrderByModel extends BaseSQLModel {
    @XmlElement(name = "column")
    private ColumnModel columnModel;
    @XmlAttribute(name = "order")
    private String sortOrder;
}

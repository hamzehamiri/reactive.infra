package org.infra.reactive.form.engine.query.model.where;

import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

@EqualsAndHashCode(callSuper = true)
@Data
public class WhereModel extends BaseSQLModel {
    @XmlElement(name = "sql_comparator_operators")
    private SqlComparatorOperators sqlComparatorOperators;
}

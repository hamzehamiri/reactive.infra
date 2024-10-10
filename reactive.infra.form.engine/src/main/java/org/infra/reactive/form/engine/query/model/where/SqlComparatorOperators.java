package org.infra.reactive.form.engine.query.model.where;

import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SqlComparatorOperators extends BaseSQLModel {
    @XmlElement(name = "sql_comparator_operator")
    private List<SqlComparatorOperator> sqlComparatorOperatorList;
}

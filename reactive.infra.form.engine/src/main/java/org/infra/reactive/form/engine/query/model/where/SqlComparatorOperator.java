package org.infra.reactive.form.engine.query.model.where;

import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
@XmlRootElement(name = "sql_comparator_operator")
public class SqlComparatorOperator extends BaseSQLModel {
    @XmlElement(name = "sql_logical_operator")
    private List<SqlLogicalOperator> sqlLogicalOperators;
    @XmlAttribute(name = "operator")
    private String operator;
}

package org.infra.reactive.form.engine.query.model.where;

import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;
import org.infra.reactive.form.engine.query.model.common.ColumnModel;

@EqualsAndHashCode(callSuper = true)
@Data
@XmlRootElement(name = "sql_logical_operator")
public class SqlLogicalOperator extends BaseSQLModel {

    @XmlElement(name = "from_column")
    private ColumnModel fromColumn;
    @XmlAttribute(name = "operator")
    private String operator;
    @XmlElement(name = "to_column")
    private ColumnModel toColumn;
    @XmlElement(name = "value")
    private SqlLogicalOperatorValue sqlLogicalOperatorValue;
}

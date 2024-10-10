package org.infra.reactive.form.engine.query.model.join;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;
import org.infra.reactive.form.engine.query.model.common.ColumnModel;

@EqualsAndHashCode(callSuper = true)
@Data
@XmlRootElement(name = "join")
public class JoinColumnModel extends BaseSQLModel {
    @XmlElement(name = "from_column")
    private ColumnModel fromColumn;
    @XmlElement(name = "to_column")
    private ColumnModel toColumn;
    @XmlElement(name = "operation")
    private String operation;
}

package org.infra.reactive.form.engine.query.model.join;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@XmlRootElement(name = "joins")
public class JoinsModel extends BaseSQLModel {
    @XmlElement(name = "join")
    private List<JoinColumnModel> joinColumns;
}

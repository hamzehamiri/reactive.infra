package org.infra.reactive.form.engine.query.model.select;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;
import org.infra.reactive.form.engine.query.model.common.ColumnInterface;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@XmlAccessorType(XmlAccessType.FIELD)
@Data
public class SelectModel extends BaseSQLModel {

    @XmlElement(name = "column")
    private List<ColumnInterface> columnInterfaces;
}

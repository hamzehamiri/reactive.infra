package org.infra.reactive.form.engine.query.model;

import jakarta.xml.bind.annotation.XmlAttribute;
import lombok.Data;

@Data
public class BaseSQLModel {
    @XmlAttribute(name = "id")
    private long id;
    @XmlAttribute(name = "uuid")
    private String uuid;
}

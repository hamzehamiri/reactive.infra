package org.infra.reactive.form.engine.query.model.order;

import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class OrdersByModel extends BaseSQLModel {
    @XmlElement(name = "order_by")
    private List<OrderByModel> orderByModels;
}

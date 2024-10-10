package org.infra.reactive.form.engine.query.model;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import org.infra.reactive.form.engine.query.model.aggregate.GroupByModel;
import org.infra.reactive.form.engine.query.model.common.ColumnInterface;
import org.infra.reactive.form.engine.query.model.join.JoinsModel;
import org.infra.reactive.form.engine.query.model.order.OrdersByModel;
import org.infra.reactive.form.engine.query.model.select.FromModel;
import org.infra.reactive.form.engine.query.model.select.SelectModel;
import org.infra.reactive.form.engine.query.model.where.WhereModel;

@Data
@XmlRootElement(name = QueryModel.TAG_NAME)
public class QueryModel implements ColumnInterface {
    public static final String TAG_NAME = "query";

    @XmlElement(name = "select")
    private SelectModel selectModel;
    @XmlElement(name = "from")
    private FromModel fromModel;
    @XmlElement(name = "joins")
    private JoinsModel joinsModel;
    @XmlElement(name = "where")
    private WhereModel whereModel;
    @XmlElement(name = "groups")
    private GroupByModel groupByModel;
    @XmlElement(name = "orders")
    private OrdersByModel ordersByModel;
}

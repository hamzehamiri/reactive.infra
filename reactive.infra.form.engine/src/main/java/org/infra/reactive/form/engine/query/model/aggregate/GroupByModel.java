package org.infra.reactive.form.engine.query.model.aggregate;

import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.query.model.BaseSQLModel;
import org.infra.reactive.form.engine.query.model.common.ColumnModel;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupByModel extends BaseSQLModel {
    @XmlElement(name = "group_by")
    private List<ColumnModel> columnModels;
}

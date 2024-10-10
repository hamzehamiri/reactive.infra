package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
public class KeyValueDTO<KEY extends Serializable, DATA extends Serializable> extends DataProviderAbstract<KEY, DATA> {
    private String display;
}

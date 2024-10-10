package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

import java.io.Serializable;
import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
public class ListKeyValueDTO<KEY extends Serializable, DATA extends Serializable> extends DataProviderAbstract<KEY, ArrayList<DATA>> {
//    private List<KeyValueDTO<KEY, DATA>> values;

    @Override
    public String getDisplay() {
        return "Display";
    }
}

package org.infra.reactive.form.engine.form.engine.model.dto.shared.editors;

import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;

import java.util.ArrayList;

public class EditorColorRGBA extends DataProviderAbstract<String, ArrayList<Integer>> {
    private int r;
    private int g;
    private int b;
    private int a;

    @Override
    public String getDisplay() {
        return "rgb(" + r + "," + "g" + "," + b + ")";
    }
}

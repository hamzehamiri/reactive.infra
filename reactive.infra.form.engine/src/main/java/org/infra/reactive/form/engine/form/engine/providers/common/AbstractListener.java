package org.infra.reactive.form.engine.form.engine.providers.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

public class AbstractListener<EVENT, SOURCE> {

    private Map<EVENT, List<BiConsumer<EVENT, SOURCE>>> listeners = new HashMap<>();

    public void addListener(EVENT queryEvent, BiConsumer<EVENT, SOURCE> queryFunctionEvent) {
        List<BiConsumer<EVENT, SOURCE>> listenerPerEvent = listeners.get(queryEvent);
        if (listenerPerEvent == null) {
            listenerPerEvent = new ArrayList<>();
            listeners.put(queryEvent, listenerPerEvent);
        }
        listenerPerEvent.add(queryFunctionEvent);
    }

    public void fireEvent(EVENT queryEvent, SOURCE queryEventSourceData) {
        List<BiConsumer<EVENT, SOURCE>> listenerPerEvent = listeners.get(queryEvent);
        if (listenerPerEvent != null) {
            for (BiConsumer<EVENT, SOURCE> queryEventQueryEventSourceDataBiConsumer : listenerPerEvent) {
                queryEventQueryEventSourceDataBiConsumer.accept(queryEvent, queryEventSourceData);
            }
        }
    }
}

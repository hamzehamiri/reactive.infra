package org.infra.reactive.form.engine.ruleengine;

import java.util.Map;

public interface Expression {
    public boolean interpret(final Map<String, ?> bindings);
}

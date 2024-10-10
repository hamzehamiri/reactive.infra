package org.infra.reactive.form.engine.ruleengine;

public class NullActionDispatcher implements ActionDispatcher {
    @Override
    public void fire() {
        System.out.println("Fire");
    }
}

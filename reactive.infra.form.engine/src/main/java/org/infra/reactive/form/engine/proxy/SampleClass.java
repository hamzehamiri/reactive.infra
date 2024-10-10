package org.infra.reactive.form.engine.proxy;

public class SampleClass {

    private String message;

    public SampleClass(String message) {
        this.message = message;
    }

    public SampleClass() {

    }

    public void print() {
        System.out.println(message);
    }
}

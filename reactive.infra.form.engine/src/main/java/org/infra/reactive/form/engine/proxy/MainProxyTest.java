package org.infra.reactive.form.engine.proxy;

import org.infra.reactive.form.engine.proxy.assist.JavaAssist;

public class MainProxyTest {
    public static void main(String[] args) {
        var sample = new SampleClass("Hamzeh");
        SampleClass dd = JavaAssist.proxy(sample);
        dd.print();
    }
}

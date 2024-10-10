package org.infra.reactive.form.engine.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class SampleClassInvocationHandler implements InvocationHandler {

    private SampleClass sampleClass;

    public SampleClassInvocationHandler(SampleClass sampleClass) {
        this.sampleClass = sampleClass;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (method.getName().equalsIgnoreCase("print")) {
            Runnable dd = () -> {
                System.out.println("Test");
            };
            return dd;
        } else {
            Object result = method.invoke(sampleClass, args);
            return result;
        }
    }

    public static SampleClass proxy(SampleClass sampleClass) {
        return (SampleClass) Proxy.newProxyInstance(
                sampleClass.getClass().getClassLoader(),
                new Class<?>[]{SampleClass.class},
                new SampleClassInvocationHandler(sampleClass)
        );
    }
}

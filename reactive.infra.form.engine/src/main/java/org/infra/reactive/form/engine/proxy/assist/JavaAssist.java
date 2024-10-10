package org.infra.reactive.form.engine.proxy.assist;

import javassist.util.proxy.MethodFilter;
import javassist.util.proxy.MethodHandler;
import javassist.util.proxy.ProxyFactory;
import org.infra.reactive.form.engine.proxy.SampleClass;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class JavaAssist {
    public static SampleClass proxy(SampleClass sampleClass) {
        ProxyFactory factory = new ProxyFactory();
        factory.setSuperclass(SampleClass.class);
        factory.setFilter(
                new MethodFilter() {
                    @Override
                    public boolean isHandled(Method method) {
                        return Modifier.isAbstract(method.getModifiers());
                    }
                }
        );
        MethodHandler handler = new MethodHandler() {
            @Override
            public Object invoke(Object self, Method thisMethod, Method proceed, Object[] args) throws Throwable {
                System.out.println("Handling " + thisMethod + " via the method handler");
                return null;
            }
        };

        try {
            SampleClass dog = (SampleClass) factory.create(new Class<?>[]{}, new Object[]{}, handler);
            return dog;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
//        ClassPool pool = ClassPool.getDefault();
//        try {
//            CtClass targetClass = pool.get(SampleClass.class.getName());
//            CtMethod targetMethod = targetClass.getDeclaredMethod("print", new CtClass[]{});
//            String sourceCode = "public void print() { System.out.println(this.message); System.out.println(this.message); }";
//            CtMethod newMethod = CtNewMethod.make(sourceCode, targetClass);
//            targetClass.removeMethod(targetMethod);
//            targetClass.addMethod(newMethod);
//            targetClass.writeFile();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
    }
}

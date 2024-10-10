package org.infra.reactive.form.engine.test;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class JavaTestBench {
    public static void main(String[] args) {
        Object object = new Object();


        synchronized (object) {

        }



        Map<String , String> stringStringMap = new ConcurrentHashMap<>(100);
        stringStringMap.put("Test" , "Test");
        int dd = Integer.numberOfLeadingZeros(32);
        System.out.println(dd);
    }
}

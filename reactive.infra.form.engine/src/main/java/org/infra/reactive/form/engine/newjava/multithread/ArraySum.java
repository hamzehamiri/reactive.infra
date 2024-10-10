package org.infra.reactive.form.engine.newjava.multithread;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ArraySum {
    private static long sum = 0L;

    public static void arraySum(int[] arr) throws Exception {
        long millisecond = System.currentTimeMillis();
        int processorsWorker = Runtime.getRuntime().availableProcessors();
        ExecutorService exec = Executors.newVirtualThreadPerTaskExecutor()/*Executors.newFixedThreadPool(processorsWorker)*/;
        int length = arr.length / processorsWorker;

        List<Long> partialSums = new ArrayList<>();
        for (int i = 0; i < processorsWorker; i++) {
            int low = i * length;
            int high = Math.min((i + 1) * length, arr.length);

            long sumOfProcess = exec.submit(() -> {
                long localSum = 0;
                for (int j = low; j < high; j++) {
                    localSum += arr[j];
                }
                return localSum;
            }).get();

            partialSums.add(sumOfProcess);
        }

        exec.shutdown();
        while (!exec.isTerminated()) ;

        System.out.printf("Time Duration : %d"  , (System.currentTimeMillis() - millisecond));
        for (Long partialSum : partialSums) {
            sum += partialSum;
        }

        System.out.println("Total sum: " + sum);
    }

    public static void main(String[] args) throws Exception {
        int depthOfArray = 100000000;
        Random random = new Random();

        int[] numbers = new int[depthOfArray]/*IntStream.generate(() -> random.nextInt(4000)).limit(depthOfArray).toArray()*/;
        for (int i = 0; i < depthOfArray; i++) {
            numbers[i] = random.nextInt(4000);
        }

        ArraySumOCL arraySumOCL = new ArraySumOCL();
        arraySumOCL.arraySum(numbers);

        arraySum(numbers);
    }
}

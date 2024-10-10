package org.infra.reactive.form.engine.test;

import java.util.Random;

public class RandomGenerator {
    public static String generateRandomString(int length) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

    public static long random(long min, long max) {
        Random random = new Random();
        return randomWithRandom(random, min, max);
    }

    public static long randomWithRandom(Random random, long min, long max) {
        return Math.abs(random.nextLong()) % ((max - min) + 1) + min;
    }
}

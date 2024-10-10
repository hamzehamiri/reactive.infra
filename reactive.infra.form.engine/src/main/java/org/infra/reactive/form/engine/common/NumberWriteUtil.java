package org.infra.reactive.form.engine.common;

import java.util.*;

public class NumberWriteUtil {

    private static final String keyAnd = " و ";
    private static final String keyAndDecimal = " -- ";
    private static final String keyBlank = " ";
    private static Map<Integer, String> oneNumber = new HashMap<>();
    private static Map<Integer, String> specialTwoNumber = new HashMap<>();
    private static Map<Integer, String> decimalPlaceTwoNumber = new HashMap<>();
    private static Map<Integer, String> decimalPlaceThreeNumber = new HashMap<>();
    private static Map<Integer, String> allPlaceThreeNumber = new HashMap<>();

    static {
        oneNumber.put(1, "یک");
        oneNumber.put(2, "دو");
        oneNumber.put(3, "سه");
        oneNumber.put(4, "چهار");
        oneNumber.put(5, "پنج");
        oneNumber.put(6, "شیش");
        oneNumber.put(7, "هفت");
        oneNumber.put(8, "هشت");
        oneNumber.put(9, "نه");

        specialTwoNumber.put(10, "ده");
        specialTwoNumber.put(11, "یازده");
        specialTwoNumber.put(12, "دوازده");
        specialTwoNumber.put(13, "سیزده");
        specialTwoNumber.put(14, "چهارده");
        specialTwoNumber.put(15, "پانزده");
        specialTwoNumber.put(16, "شانزده");
        specialTwoNumber.put(17, "هفده");
        specialTwoNumber.put(18, "هجده");
        specialTwoNumber.put(19, "نانزده");

        decimalPlaceTwoNumber.put(2, "بیست");
        decimalPlaceTwoNumber.put(3, "سی");
        decimalPlaceTwoNumber.put(4, "چهل");
        decimalPlaceTwoNumber.put(5, "پنجاه");
        decimalPlaceTwoNumber.put(6, "شصت");
        decimalPlaceTwoNumber.put(7, "هفتاد");
        decimalPlaceTwoNumber.put(8, "هشتاد");
        decimalPlaceTwoNumber.put(9, "نود");

        decimalPlaceThreeNumber.put(1, "صد");
        decimalPlaceThreeNumber.put(2, "دویست");
        decimalPlaceThreeNumber.put(3, "سیصد");
        decimalPlaceThreeNumber.put(4, "چهارصد");
        decimalPlaceThreeNumber.put(5, "پانصد");
        decimalPlaceThreeNumber.put(6, "شیشصد");
        decimalPlaceThreeNumber.put(7, "هفتصد");
        decimalPlaceThreeNumber.put(8, "هشتصد");
        decimalPlaceThreeNumber.put(9, "نهصد");

        allPlaceThreeNumber.put(1, "هزار");
        allPlaceThreeNumber.put(2, "میلیون");
        allPlaceThreeNumber.put(3, "میلیارد");
        allPlaceThreeNumber.put(4, "تریلیون");
        allPlaceThreeNumber.put(5, "کوآدریلیون");
        allPlaceThreeNumber.put(6, "کوینتیلیون");
    }

    private static List<String> separatedNumberString(String str) {
        int length = str.length();
        int start = 0;
        int end = 0;
        List<String> allSeparated = new ArrayList<>();
        while (length > 0) {
            start = Math.max(0, length - 3);
            end = length;
            allSeparated.add(str.substring(start, end));
            length -= 3;
        }
        return allSeparated;
    }

    public static String writeNumberString(long number) {
        String mainNumber = String.valueOf(number);
        List<String> results = separatedNumberString(mainNumber);
        StringBuilder stringBuilder = new StringBuilder();

        boolean removeAnd = false;
        boolean removeAndDecimal = false;
        for (int placeIndex = results.size() - 1; placeIndex >= 0; placeIndex--) {
            String numberThree = results.get(placeIndex);
            removeAnd = false;
            if (numberThree.length() == 3) {
                int three = Integer.parseInt(String.valueOf(numberThree.charAt(0)));
                if (three > 0) {
                    stringBuilder.append(decimalPlaceThreeNumber.get(three));
                    stringBuilder.append(keyAnd);
                    removeAnd = true;
                }
                numberThree = numberThree.substring(1);
            }

            if (numberThree.length() == 2) {
                int two = Integer.parseInt(String.valueOf(numberThree.charAt(0)));
                if (two > 1) {
                    stringBuilder.append(decimalPlaceTwoNumber.get(two));
                    stringBuilder.append(keyAnd);
                    numberThree = numberThree.substring(1);
                    removeAnd = true;
                } else if (two == 1) {
                    two = Integer.parseInt(numberThree);
                    stringBuilder.append(specialTwoNumber.get(two));
                    stringBuilder.append(keyAnd);
                    removeAnd = true;
                } else {
                    numberThree = numberThree.substring(1);
                }
            }

            if (numberThree.length() == 1) {
                int one = Integer.parseInt(String.valueOf(numberThree.charAt(0)));
                if (one > 0) {
                    stringBuilder.append(oneNumber.get(one));
                    stringBuilder.append(keyAnd);
                    removeAnd = true;
                }
            }

            if (removeAnd) {
                stringBuilder.delete(stringBuilder.length() - keyAnd.length(), stringBuilder.length());
                stringBuilder.append(keyBlank);
                if (placeIndex > 0) {
                    stringBuilder.append(allPlaceThreeNumber.get(placeIndex));
                    stringBuilder.append(keyAndDecimal);
                    removeAndDecimal = true;
                } else {
//                    if (removeAndDecimal)
//                        stringBuilder.delete(stringBuilder.length() - keyAndDecimal.length(), stringBuilder.length());
                }
            }
        }

        return stringBuilder.toString();
    }

    public static String numberWrite(long number) {
        long remainThousand = number % 1000;
        int remainHundred = 0;
        int remainTwo = 0;

        LinkedList<String> fifoNumber = new LinkedList<>();

        while (remainThousand != 0) {
            remainHundred = (int) (remainThousand % 100);
            int placeThree = (int) ((remainThousand - remainHundred) / 100);
            if (remainHundred <= 19) {
                if (remainHundred > 9) {
                    fifoNumber.add(specialTwoNumber.get(remainHundred));
                } else {
                    fifoNumber.add(oneNumber.get(remainHundred));
                }
            } else {
                remainTwo = remainHundred % 10;
            }

        }

        StringBuilder stringBuilder = new StringBuilder();

        return "";
    }

    public static void main(String[] args) {
        Hashtable<Integer,String> ht=new Hashtable<Integer,String>();
        ht.put(101," ajay");
        ht.put(101,"Vijay");
        ht.put(102,"Ravi");
        ht.put(103,"Rahul");
        System.out.println("-------------Hash table--------------");
        for (Map.Entry m:ht.entrySet()) {
            System.out.println(m.getKey()+" "+m.getValue());
        }
        String writeNumber = writeNumberString(1230450100L);
        System.out.printf(writeNumber);
    }
}

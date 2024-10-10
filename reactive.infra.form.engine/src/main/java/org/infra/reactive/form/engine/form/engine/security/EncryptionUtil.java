package org.infra.reactive.form.engine.form.engine.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.Security;
import java.util.ArrayList;
import java.util.List;

public class EncryptionUtil {

    public static List<String> getAllAlgorithms() {
        Provider[] providers = Security.getProviders();
        List<String> algorithms = new ArrayList<>();

        for (int i = 0; i < providers.length; i++) {
            Provider provider = providers[i];
            System.out.println(provider.getName());
            provider.getServices().forEach(service -> {
                algorithms.add(service.getAlgorithm());
            });
        }

        return algorithms;
    }

    public static String encryptPassword(String password) {

        try {
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            byte[] encryptPassword = messageDigest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < encryptPassword.length; i++) {
                hexString.append(Integer.toHexString(0xFF & encryptPassword[i]));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        String encryptPassword = EncryptionUtil.encryptPassword("hamzehamiri");
        EncryptionUtil.getAllAlgorithms();
        System.out.println(encryptPassword);
    }
}

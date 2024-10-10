package org.infra.reactive.form.engine.registery.ver2;

import java.util.List;
import java.util.Map;

public class WindowsRegistry {
    private static WindowsRegistry instance = new WindowsRegistry();

    private WindowsRegistry() {
    }

    public static WindowsRegistry getInstance() {
        return instance;
    }

    public String readString(HKey hk, String key, String valueName) throws RegistryException {
        return readString(hk, key, valueName, null);
    }

    public String readString(HKey hk, String key, String valueName, String charsetName) throws RegistryException {
        try {
            return ReflectedMethods.readString(hk.root(), hk.hex(), key, valueName, charsetName);
        } catch (Exception e) {
            throw new RegistryException("Cannot read " + valueName + " value from key " + key, e);
        }
    }

    public Map<String, String> readStringValues(HKey hk, String key) throws RegistryException {
        return readStringValues(hk, key, null);
    }

    public Map<String, String> readStringValues(HKey hk, String key, String charsetName) throws RegistryException {
        try {
            return ReflectedMethods.readStringValues(hk.root(), hk.hex(), key, charsetName);
        } catch (Exception e) {
            throw new RegistryException("Cannot read values from key " + key, e);
        }
    }

    public List<String> readStringSubKeys(HKey hk, String key) throws RegistryException {
        return readStringSubKeys(hk, key, null);
    }

    public List<String> readStringSubKeys(HKey hk, String key, String charsetName) throws RegistryException {
        try {
            return ReflectedMethods.readStringSubKeys(hk.root(), hk.hex(), key, charsetName);
        } catch (Exception e) {
            throw new RegistryException("Cannot read sub keys from key " + key, e);
        }
    }

    public void createKey(HKey hk, String key) throws RegistryException {
        int[] ret;
        try {
            ret = ReflectedMethods.createKey(hk.root(), hk.hex(), key);
        } catch (Exception e) {
            throw new RegistryException("Cannot create key " + key, e);
        }
        if (ret.length == 0) {
            throw new RegistryException("Cannot create key " + key + ". Zero return length");
        }
        if (ret[1] != RC.SUCCESS) {
            throw new RegistryException("Cannot create key " + key + ". Return code is " + ret[1]);
        }
    }

    public void writeStringValue(HKey hk, String key, String valueName, String value) throws RegistryException {
        try {
            ReflectedMethods.writeStringValue(hk.root(), hk.hex(), key, valueName, value);
        } catch (Exception e) {
            throw new RegistryException("Cannot write " + valueName + " value " + value + " in key " + key, e);
        }
    }

    public void deleteKey(HKey hk, String key) throws RegistryException {
        int rc = -1;
        try {
            rc = ReflectedMethods.deleteKey(hk.root(), hk.hex(), key);
        } catch (Exception e) {
            throw new RegistryException("Cannot delete key " + key, e);
        }
        if (rc != RC.SUCCESS) {
            throw new RegistryException("Cannot delete key " + key + ". Return code is " + rc);
        }
    }

    public void deleteValue(HKey hk, String key, String value) throws RegistryException {
        int rc = -1;
        try {
            rc = ReflectedMethods.deleteValue(hk.root(), hk.hex(), key, value);
        } catch (Exception e) {
            throw new RegistryException("Cannot delete value " + value + " from key " + key, e);
        }
        if (rc != RC.SUCCESS) {
            throw new RegistryException("Cannot delete value " + value + " from key " + key + ". Return code is " + rc);
        }
    }

    public static void main(String[] args) throws RegistryException {
        WindowsRegistry reg = WindowsRegistry.getInstance();
        String tree = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion";
        String value = reg.readString(HKey.HKLM, tree, "ProductName");
        System.out.println("Windows Distribution = " + value);
    }
}

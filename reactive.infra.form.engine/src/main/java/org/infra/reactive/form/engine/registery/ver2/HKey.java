package org.infra.reactive.form.engine.registery.ver2;

import java.util.prefs.Preferences;

import static org.infra.reactive.form.engine.registery.ver2.WindowsPreferencesBuilder.*;

public enum HKey {
    HKCR(HKCR_VALUE, WindowsPreferencesBuilder.getHKCR()),
    HKCU(HKCU_VALUE, Preferences.userRoot()),
    HKLM(HKLM_VALUE, Preferences.systemRoot()),
    HKU(HKU_VALUE, WindowsPreferencesBuilder.getHKU()),
    HKCC(HKCC_VALUE, WindowsPreferencesBuilder.getHKCC());

    private int hex = 0;

    private Preferences root = null;

    private HKey(final int hex, final Preferences root) {
        this.hex = hex;
        this.root = root;
    }

    public int hex() {
        return hex;
    }

    public Preferences root() {
        return root;
    }

    public static HKey fromHex(int hex) {
        HKey[] hks = HKey.values();
        for (HKey hk : hks) {
            if (hk.hex() == hex) {
                return hk;
            }
        }
        return null;
    }
}
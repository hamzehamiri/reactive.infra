package org.infra.reactive.form.engine.registery.ver3;

import java.util.prefs.BackingStoreException;
import java.util.prefs.Preferences;

public class WinRegister {
    public static void main(String[] args) throws BackingStoreException {
        Preferences preferenceRoot = Preferences.systemRoot();
        Preferences preferenceUser = Preferences.userRoot();

        preferenceUser.put("Test" , "t1");
//        preferenceUser.nodeExists("\\3t\\mongochef\\enterprise");
//        preferenceUser.get("HKEY_CURRENT_USER\\SOFTWARE\\JavaSoft\\Prefs\\3t\\mongochef\\enterprise" , "bnrrjeye6fas6qaqgi-exa--");
//        preferenceUser.keys();
//        preferenceUser.childrenNames();
//
//
//        preferenceRoot.nodeExists("HKEY_USERS\\S-1-5-18\\Control Panel\\Colors");
//        preferenceRoot.get("HKEY_USERS\\S-1-5-18\\Control Panel\\Colors" , "ButtonLight");
//        preferenceRoot.keys();
//        preferenceRoot.childrenNames();
    }
}

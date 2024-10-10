package org.hamzeh.erp.android.connections.rest;

import androidx.annotation.NonNull;
import org.jetbrains.annotations.NotNull;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class RestApiConnection {
    private String urlString;
    private RestMethod restMethod;
    private HttpURLConnection connectionHttp;
    private HttpsURLConnection connectionHttps;

    public RestApiConnection(String url, RestMethod restMethod) {
        this.urlString = url;
        this.restMethod = restMethod;
    }

    public void sendRequest() throws IOException {
        URL url = new URL(urlString);
        connectionHttp = (HttpURLConnection) url.openConnection();
        connectionHttp.setRequestMethod(restMethod.toString());
        connectionHttp.setRequestProperty("Accept", "application/json");
        connectionHttp.setRequestProperty("Content-Type", "application/json");
    }

    public enum RestMethod {
        Post("post"), Get("get"), Put("put"), Delete("delete");

        private String method;

        RestMethod(String method) {
            this.method = method;
        }

        @NonNull
        @NotNull
        @Override
        public String toString() {
            return method;
        }
    }
}

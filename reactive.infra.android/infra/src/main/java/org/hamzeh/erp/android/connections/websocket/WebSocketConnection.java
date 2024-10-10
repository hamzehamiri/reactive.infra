package org.hamzeh.erp.android.connections.websocket;

import org.java_websocket.WebSocketListener;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

public class WebSocketConnection {
    private WebSocketClient wsClient;
    private List<WebSocketListener> listeners = new ArrayList<>();

    public void connect(String url) throws URISyntaxException {
        wsClient = new WebSocketClient(new URI(url)) {
            @Override
            public void onOpen(ServerHandshake serverHandshake) {
                for (WebSocketListener listener : listeners) {
                    listener.onWebsocketOpen(wsClient, serverHandshake);
                }
            }

            @Override
            public void onMessage(String message) {
                for (WebSocketListener listener : listeners) {
                    listener.onWebsocketMessage(wsClient, message);
                }
            }

            @Override
            public void onClose(int code, String reason, boolean remote) {
                for (WebSocketListener listener : listeners) {
                    listener.onClose(code, reason, remote);
                }
            }

            @Override
            public void onError(Exception ex) {
                for (WebSocketListener listener : listeners) {
                    listener.onError(ex);
                }
            }
        };

        wsClient.connect();
    }

    public void addListener(WebSocketListener listener) {
        listeners.add(listener);
    }

    public void close() {
        wsClient.close();
    }
}

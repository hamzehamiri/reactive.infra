package org.hamzeh.erp.android.connections.rest;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class NonBlockingSocketClient {
    private final Socket socket;
    private final BufferedReader reader;
    private final PrintWriter writer;
    private final Handler handler;

    public NonBlockingSocketClient(String host, int port) throws IOException {
        this.socket = new Socket(host, port);
        this.reader = new BufferedReader(new InputStreamReader(socket.getInputStream()), 8192);
        this.writer = new PrintWriter(socket.getOutputStream(), true);
        this.handler = new Handler(Looper.getMainLooper());
    }

    public void sendMessage(String message) {
        new Thread(() -> {
            writer.println(message);
            writer.flush();
        }).start();
    }

    public void readResponse() {
        new Thread(() -> {
            try {
                String line;
                while ((line = reader.readLine()) != null) {
                    String finalLine = line;
                    handler.post(() -> {
                        Log.d("RESPONSE", "Received: " + finalLine);
                    });
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void close() {
        try {
            if (reader != null) reader.close();
            if (writer != null) writer.close();
            if (socket != null) socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

import {BaseObservable} from "../UIFrameWork/Shared/Event/BaseObservable.js";

export const WebSocketBinaryType = {
    BLOB: "blob",
    ArrayBuffer: "arraybuffer"
};

export const WebSocketState = {
    Init: 'Init',
    OPEN: "OPEN",
    CLOSING: 'CLOSING',
    CLOSED: 'CLOSED',
    CONNECTING: 'CONNECTING'
};

export const WebSocketEvent = {
    OnMessage: 'message',
    OnError: 'Error'
}

export class WebSocketService extends BaseObservable {

    constructor() {
        super();
        this.messageQueue = [];
    };

    request(url, webSocketType) {
        this.url = url;
        this.webSocketType = webSocketType;

        this.websocketInstance = new WebSocket(this.getWebSocketURL()/*, this.getProtocolHeader()*/);
        this.STATE = WebSocketState.Init;
        this.websocketInstance.binaryType = this.webSocketType === undefined ? WebSocketBinaryType.ArrayBuffer : this.webSocketType;
        this.websocketInstance.onmessage = (event) => {
            this.fireEvent(WebSocketEvent.OnMessage, event);
        };

        this.websocketInstance.onerror = (event) => {
            this.fireEvent(WebSocketEvent.OnError, event);
        };

        this.websocketInstance.onopen = (event) => {
            this.STATE = WebSocketState.OPEN;
            this.popMessage();
        };
        this.websocketInstance.onclose = (event) => {
            this.STATE = WebSocketState.CLOSED;
        }
    }

    getProtocolHeader() {
        return [];
    }

    send(data) {
        if (this.STATE === WebSocketState.OPEN) {
            this.websocketInstance.send(JSON.stringify(data.toJSON()));
        } else {
            this.messageQueue.push(data);
        }
    }

    popMessage() {
        let message = this.messageQueue.pop();
        while (message) {
            this.send(message);
            message = this.messageQueue.pop();
        }
    }

    getWebSocketURL() {
        return location.protocol === 'https:' ? "wss://" : "ws://" + location.host + "/" + this.url;
    }

    getProtocol() {
        return this.websocketInstance.protocol;
    }

    getExtensions() {
        return this.websocketInstance.extensions;
    }

    getReadyState() {
        return this.websocketInstance.readyState;
    }

    /*
    * The WebSocket.bufferedAmount read-only property returns the number of bytes of
    * data that have been queued using calls to send() but not yet transmitted to the network.
    * This value resets to zero once all queued data has been sent. This value does not reset to
    * zero when the connection is closed; if you keep calling send(), this will continue to climb
    * */
    getBufferedAmount() {
        return this.websocketInstance.bufferedAmount;
    }
}
import WebEnvironment from "../../Common/WebEnvironment.js";
import WebSocketRequestRouterDTO from "../../Models/Request/WebSocket/WebSocketRequestRouterDTO.js";
import WebSocketResponseRouterDTO from "../../Models/Response/WebSocket/WebSocketResponseRouterDTO.js";
import WebSocketServiceImplBase from "../NewService/WebSocketServiceImplBase.js";
import {WebSocketEvent} from "../../../../ProxyService/WebSocketService.js";
import BaseEvent from "../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class WebSocketSingleton {

    static Init() {
        WebSocketSingleton.serviceMap = new Map();
        WebSocketSingleton.instanceSocket = new WebSocketSingleton();
    }

    static instance() {return WebSocketSingleton.instanceSocket};

    constructor() {
        this.messageQueue = [];
        this.state = 'init';
        this.url = "api/websocket/router";
    };

    register(uuid, service) {
        WebSocketSingleton.serviceMap.set(uuid, service);
    }

    unRegister(uuid) {
        WebSocketSingleton.serviceMap.delete(uuid);
    }

    start() {
        this.webSocketInstance = new WebSocket(this.getWebSocketURL());
        this.webSocketInstance.onopen = (event) => {
            this.state = 'open';
            this.popMessage();
        };
        this.webSocketInstance.onmessage = (event) => {
            try {
                let serviceImplAndModel = this.findService(event);
                serviceImplAndModel.serviceImpl.onMessageReceive();
                serviceImplAndModel.serviceImpl.fireEvent(WebSocketEvent.OnMessage, new BaseEvent(serviceImplAndModel.webSocketResponseRouterDTO.getBody()));
            } catch (e) {

            }
        }
        this.webSocketInstance.onerror = (event) => {
            try {
                let serviceImplAndModel = this.findService(event);
                serviceImplAndModel.serviceImpl.showError(serviceImplAndModel.webSocketResponseRouterDTO.getBody());
                serviceImplAndModel.serviceImpl.fireEvent(WebSocketEvent.OnError, new BaseEvent(serviceImplAndModel.webSocketResponseRouterDTO.getBody()));
            } catch (e) {

            }
        };
        this.webSocketInstance.onclose = (event) => {
            this.state = 'close';
        }
    }

    findService(source) {
        let json = JSON.parse(source.data);
        let webSocketResponseRouterDTO = new WebSocketResponseRouterDTO();
        webSocketResponseRouterDTO.applyData(json);

        if (webSocketResponseRouterDTO.getUuid()) {
            let serviceImpl = WebSocketSingleton.serviceMap.get(webSocketResponseRouterDTO.getUuid());
            if (serviceImpl instanceof WebSocketServiceImplBase) {
                let bodyModel = serviceImpl.convertBody(webSocketResponseRouterDTO.getBody());
                if (bodyModel) {
                    webSocketResponseRouterDTO.setBody(bodyModel);
                }
                return {
                    serviceImpl,
                    webSocketResponseRouterDTO
                }
            }
        } else {
            throw "Service NotFound";
        }
    }

    popMessage() {
        let webSocketRequestRouterDTO = this.messageQueue.pop();
        while (webSocketRequestRouterDTO) {
            this.send(webSocketRequestRouterDTO);
            webSocketRequestRouterDTO = this.messageQueue.pop();
        }
    }

    sendModel(modelData, serviceKeyRegister, uuid) {
        let webSocketRequestRouterDTO = new WebSocketRequestRouterDTO();
        webSocketRequestRouterDTO.setServiceKeyRegister(serviceKeyRegister);
        webSocketRequestRouterDTO.setUuid(uuid);
        webSocketRequestRouterDTO.setBody(modelData);
        this.send(webSocketRequestRouterDTO);
    }

    send(webSocketRequestRouterDTO) {
        if (this.state === 'open') {
            this.webSocketInstance.send(webSocketRequestRouterDTO.toJsonString());
        } else if (this.state === 'close') {
            this.start();
            this.messageQueue.push(webSocketRequestRouterDTO);
        } else {
            this.messageQueue.push(webSocketRequestRouterDTO);
        }
    }

    getWebSocketURL() {
        let token = WebEnvironment.GetToken();
        document.cookie = 'X-Authorization=' + token + '; path=/';
        return location.protocol === 'https:' ? "wss://" + location.host + "/" + this.url : "ws://" + location.host + "/" + this.url;
    }
}
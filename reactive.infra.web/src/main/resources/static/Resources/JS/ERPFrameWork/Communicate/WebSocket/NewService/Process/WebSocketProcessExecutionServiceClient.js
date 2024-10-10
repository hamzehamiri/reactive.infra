import WebSocketProcessExecutionAbstractServiceClient from "./WebSocketProcessExecutionAbstractServiceClient.js";
import {WebSocketProcessServices} from "./WebSocketProcessServices.js";

export default class WebSocketProcessExecutionServiceClient extends WebSocketProcessExecutionAbstractServiceClient {
    constructor(component) {
        super(component, WebSocketProcessServices.ProcessExecution);
    }

    onMessageReceive() {

    }
}
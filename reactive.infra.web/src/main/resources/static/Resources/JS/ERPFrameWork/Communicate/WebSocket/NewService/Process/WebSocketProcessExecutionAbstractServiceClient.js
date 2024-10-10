import WebSocketServiceImplBase from "../WebSocketServiceImplBase.js";
import {WebSocketEvent} from "../../../../../ProxyService/WebSocketService.js";
import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreProcessResponseDTO from "../../../Models/Response/Process/CoreProcessResponseDTO.js";
import CoreProcessRequestDTO from "../../../Models/Request/Process/CoreProcessRequestDTO.js";

export default class WebSocketProcessExecutionAbstractServiceClient extends WebSocketServiceImplBase {
    constructor(component , serviceName) {
        super(component);

        this.setServiceName(serviceName);

        this.addListener(WebSocketEvent.OnMessage, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let body = baseEvent.getSource();
                let coreProcessResponseDTO = ConvertUtil.ConvertGeneral(CoreProcessResponseDTO, body);
                this.callBack(coreProcessResponseDTO, coreProcessResponseDTO.getTaskComplete() / coreProcessResponseDTO.getTotalEstimate());
            }
        });
        this.addListener(WebSocketEvent.OnError, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let body = baseEvent.getSource();
                console.log(body);
            }
        })
    }

    onMessageReceive() {

    }

    send(coreProcessRequestDTO, callBack) {
        this.callBack = callBack;
        if (coreProcessRequestDTO instanceof CoreProcessRequestDTO) {
            this.sendModel(coreProcessRequestDTO);
        }
    }
}
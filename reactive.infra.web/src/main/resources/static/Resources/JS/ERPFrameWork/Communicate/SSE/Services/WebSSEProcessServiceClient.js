import CommunicateConstantURL from "../../Common/CommunicateConstantURL.js";
import SSEBaseService from "../Base/SSEBaseService.js";
import CoreProcessResponseDTO from "../../Models/Response/Process/CoreProcessResponseDTO.js";

export default class WebSSEProcessServiceClient extends SSEBaseService {
    constructor(component, withCredentials, callBack) {
        super(CommunicateConstantURL.ProcessExecute, component, withCredentials, true);
        this.callBack = callBack;
    }

    convertJsonToModel(messageJson) {
        super.convertJsonToModel(messageJson);
        let coreProcessResponseDTO = new CoreProcessResponseDTO();
        this.callBack(coreProcessResponseDTO);
    }

}
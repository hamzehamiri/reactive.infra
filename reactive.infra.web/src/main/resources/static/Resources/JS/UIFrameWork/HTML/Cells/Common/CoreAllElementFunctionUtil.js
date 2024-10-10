import CoreMenuDTO from "../../../../ERPFrameWork/Communicate/Models/Response/Menu/CoreMenuDTO.js";

export default class CoreAllElementFunctionUtil {
    static CoreMenuToCoreAllElementFunction(coreMenuDTO) {
        if (coreMenuDTO instanceof CoreMenuDTO) {
            return [coreMenuDTO.getSourceCoreAllElementDTO(), coreMenuDTO.getId()];
        }
    }
}
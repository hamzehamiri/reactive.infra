import CommunicateConstantURL from "../../../../ERPFrameWork/Communicate/Common/CommunicateConstantURL.js";
import CoreAllElementDTO from "../../../../ERPFrameWork/Communicate/Models/Response/Element/CoreAllElementDTO.js";

export default class AttachmentIconUtil {
    static FunctionIconInvoker(coreAllElementDTO, record_id) {
        if (coreAllElementDTO instanceof CoreAllElementDTO) {
            return CommunicateConstantURL.IconDownloader + "?" + "core_all_element_id=" + coreAllElementDTO.getId() + "&record_id=" + record_id;
        }
    }
}
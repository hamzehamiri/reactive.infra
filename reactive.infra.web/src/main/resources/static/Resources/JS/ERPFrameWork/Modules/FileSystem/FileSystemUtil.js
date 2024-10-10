import IconDownloadRequestDTO from "../../Communicate/Models/Request/FileSystem/IconDownloadRequestDTO.js";
import WebFileManagerServiceIconDownloaderClient from "../../Communicate/XMLHttpRequest/Services/FileSystem/WebFileManagerServiceIconDownloaderClient.js";

export default class FileSystemUtil {

    static RequestIconDownload(imgTag, Core_all_element_id, Record_id) {
        let iconModelRequest = new IconDownloadRequestDTO();
        iconModelRequest.setCore_all_element_id(Core_all_element_id);
        iconModelRequest.setRecord_id(Record_id);

        let serviceIconDownloader = new WebFileManagerServiceIconDownloaderClient();
        serviceIconDownloader.IconDownloader(iconModelRequest, (byteData) => {
            imgTag.src = byteData;
        });
    }
}
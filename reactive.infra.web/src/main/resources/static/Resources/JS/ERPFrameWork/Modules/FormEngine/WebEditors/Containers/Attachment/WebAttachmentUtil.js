import EditorAttachmentDTO from "../../../../../Communicate/Common/DataProvider/Impl/EditorAttachmentDTO.js";
import WebEnvironment from "../../../../../Communicate/Common/WebEnvironment.js";

export default class WebAttachmentUtil {
    static getWebDavLink(baseUrl, editorAttachmentDTO) {
        if (editorAttachmentDTO instanceof EditorAttachmentDTO) {
            let webDavPrefixUtl = WebAttachmentUtil.getFileType(editorAttachmentDTO.getFileName()).WebDav;
            return webDavPrefixUtl + baseUrl + "/" + "Test.docx?token=" + WebEnvironment.GetToken() + "&attachment=" + editorAttachmentDTO.toJsonString();
        }
    }

    static getFileType(fileName) {
        let appByExtension = new Map();
        appByExtension.set("docx", {App: "Office", WebDav: "ms-word:ofe|u|"});
        appByExtension.set("doc", {App: "Office", WebDav: "ms-word:ofe|u|"});
        appByExtension.set("txt", {App: "Office", WebDav: "ms-word:ofe|u|"});
        appByExtension.set("ppt", {App: "Office", WebDav: "ms-powerpoint:ofe|u|"});
        appByExtension.set("pptx", {App: "Office", WebDav: "ms-powerpoint:ofe|u|"});
        appByExtension.set("xlsx", {App: "Office", WebDav: "ms-excel:ofe|u|"});
        appByExtension.set("xls", {App: "Office", WebDav: "ms-excel:ofe|u|"});
        if (fileName) {
            let fileNameAndExtension = fileName.split(".");
            let extension = fileNameAndExtension[1].toLowerCase();
            return appByExtension.get(extension);
        }

        return {
            App: "Office",
            WebDav: "ms-word:ofe|u|"
        }
    }
}
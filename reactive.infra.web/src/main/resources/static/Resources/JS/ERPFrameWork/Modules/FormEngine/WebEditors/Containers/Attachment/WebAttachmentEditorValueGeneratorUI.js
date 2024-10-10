import WebEditorValueGeneratorUI from "../../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueGeneratorUI.js";
import FlexLayout, {FlexDirection} from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import EditorAttachment from "../../../../../Communicate/Common/DataProvider/Impl/EditorAttachment.js";
import FlexLayoutData from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import WebAttachmentUI from "./WebAttachmentUI.js";
import EditorAttachmentDTO from "../../../../../Communicate/Common/DataProvider/Impl/EditorAttachmentDTO.js";
import ConvertUtil from "../../../../../Communicate/Common/ConvertUtil.js";
import FormEngineEventFrameWork from "../../../Events/FormEngineEventFrameWork.js";
import WebAttachmentUIStartUploadEvent from "./WebAttachmentUIStartUploadEvent.js";
import WebFileManagerServiceUploadClient from "../../../../../Communicate/XMLHttpRequest/Services/FileSystem/WebFileManagerServiceUploadClient.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import WebAttachmentUtil from "./WebAttachmentUtil.js";
import CommunicateConstantURL from "../../../../../Communicate/Common/CommunicateConstantURL.js";
import WebAttachmentCentralProxy from "./WebAttachmentCentralProxy.js";

export default class WebAttachmentEditorValueGeneratorUI extends WebEditorValueGeneratorUI {
    constructor(webEditor) {
        super(webEditor);
    }

    generateUi(value) {
        let container = this.webEditor.containerOfItems;
        container.setLayout(new FlexLayout(FlexDirection.row));

        let editorAttachmentMap = new Map();
        container.getItems().forEach((attachmentUi) => {
            let editorAttachmentDTO = attachmentUi.getEditorAttachmentDTO();
            if (editorAttachmentDTO.getId()) {
                editorAttachmentMap.set(editorAttachmentDTO.getId(), editorAttachmentDTO);
            } else if (editorAttachmentDTO.getUUID()) {
                editorAttachmentMap.set(editorAttachmentDTO.getUUID(), editorAttachmentDTO);
            }
        });

        if (value instanceof EditorAttachment) {
            let attachmentDataArray = value.getOriginalData();
            if (attachmentDataArray instanceof Array) {
                attachmentDataArray.forEach((editorAttachmentDTOJson) => {
                    let editorAttachmentDTO = ConvertUtil.ConvertGeneral(EditorAttachmentDTO, editorAttachmentDTOJson);

                    if (editorAttachmentDTO.getId()) {
                        if (!editorAttachmentMap.has(editorAttachmentDTO.getId())) {
                            this.createAttachmentUi(container, editorAttachmentDTO);
                        }
                    } else if (editorAttachmentDTO.getUUID()) {
                        if (!editorAttachmentMap.has(editorAttachmentDTO.getUUID())) {
                            this.createAttachmentUi(container, editorAttachmentDTO);
                        }
                    }
                });
            }
        }
    }

    createAttachmentUi(container, editorAttachmentDTO) {
        let attachmentUi = new WebAttachmentUI();
        attachmentUi.bindModelToUI(editorAttachmentDTO);
        attachmentUi.addListener(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorStartUploadEvent, (attachmentUIStartUploadEvent) => {
            if (attachmentUIStartUploadEvent instanceof WebAttachmentUIStartUploadEvent) {
                if (attachmentUIStartUploadEvent.getEditorAttachmentDTO() != null && attachmentUIStartUploadEvent.getEditorAttachmentDTO().getUUID() != null) {
                    if (!WebAttachmentCentralProxy.CheckAttachmentIsUploading(attachmentUIStartUploadEvent.getEditorAttachmentDTO().getUUID())) {
                        WebAttachmentCentralProxy.Register(attachmentUIStartUploadEvent.getEditorAttachmentDTO().getUUID(), attachmentUIStartUploadEvent.getEditorAttachmentDTO());
                        new WebFileManagerServiceUploadClient(attachmentUIStartUploadEvent.getSource()).Upload(attachmentUIStartUploadEvent.getFormData(), (progressEvent) => {
                            if (progressEvent instanceof ProgressEvent) {
                                let percent = (progressEvent.loaded / progressEvent.total) * 100;
                                attachmentUi.progress.percentDraw(percent);
                                editorAttachmentDTO.setUploadPercent(percent);
                                if (percent === 100) {
                                    WebAttachmentCentralProxy.UnRegister(attachmentUIStartUploadEvent.getEditorAttachmentDTO().getUUID());
                                }
                            }
                        });
                    }
                }
            }
        });
        attachmentUi.addListener(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorEditEvent, (attachmentUIStartUploadEvent) => {
            if (attachmentUIStartUploadEvent instanceof WebAttachmentUIStartUploadEvent) {
                let editorAttachmentDTO = attachmentUIStartUploadEvent.getSource().getEditorAttachmentDTO();
                let webDavLinkSimulation = DOM.createElement("a");
                webDavLinkSimulation.href = WebAttachmentUtil.getWebDavLink(CommunicateConstantURL.EditFile, editorAttachmentDTO);
                webDavLinkSimulation.click();
            }
        });

        container.addItem(attachmentUi, FlexLayoutData.factory(0, 2, 2, 2, 2));
    }
}
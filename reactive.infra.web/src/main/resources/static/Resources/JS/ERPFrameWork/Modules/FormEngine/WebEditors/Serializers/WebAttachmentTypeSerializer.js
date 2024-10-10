import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import EditorAttachment from "../../../../Communicate/Common/DataProvider/Impl/EditorAttachment.js";
import FlexLayout, {FlexDirection} from "../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";
import EditorAttachmentDTO from "../../../../Communicate/Common/DataProvider/Impl/EditorAttachmentDTO.js";
import FlexLayoutData from "../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import DataProviderAbstract from "../../../../Communicate/Common/DataProvider/DataProviderAbstract.js";
import WebAttachmentUI from "../Containers/Attachment/WebAttachmentUI.js";

export default class WebAttachmentTypeSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let editorAttachment;
        if (webEditorValue instanceof EditorAttachment) {
            editorAttachment = webEditorValue;
        } else {
            editorAttachment = new EditorAttachment();
            editorAttachment.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
            editorAttachment.setDisplay(webEditorValue);
            editorAttachment.setKey(webEditorValue);
        }
        return editorAttachment;
    }

    convertRawToCellRender(webEditorValue, coreWindowTabFieldDTO, webAdvancedGrid, record, keyForModelCell) {
        let modelCellValue = webAdvancedGrid.recordDescriptorForCell(record, keyForModelCell);

        let containerAttachmentCell = new HTMLContainer();
        containerAttachmentCell.setLayout(new FlexLayout(FlexDirection.row));
        if (webEditorValue instanceof DataProviderAbstract) {
            let attachmentDataArray = webEditorValue.getOriginalData();
            if (attachmentDataArray instanceof Array) {
                attachmentDataArray.forEach((editorAttachmentDTOJson) => {
                    let editorAttachmentDTO = ConvertUtil.ConvertGeneral(EditorAttachmentDTO, editorAttachmentDTOJson);

                    let attachmentUi = new WebAttachmentUI();
                    attachmentUi.bindModelToUI(editorAttachmentDTO);

                    containerAttachmentCell.addItem(attachmentUi, FlexLayoutData.factory(1, 0, 0, 0, 0));
                });
            }
        }
        return {
            Render: containerAttachmentCell,
            Value: modelCellValue
        };
    }

    serializeModelToDisplay(dataProviderString, coreWindowTabFieldDTO) {
        return dataProviderString.display;
    }
}
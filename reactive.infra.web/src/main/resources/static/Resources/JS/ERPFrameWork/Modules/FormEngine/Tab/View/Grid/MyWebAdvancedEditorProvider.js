import WebGridAdvancedEditorProvider from "../../../../../../UIFrameWork/HTML/Cells/Grid/Advanced/WebGridAdvancedEditorProvider.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import TabUtil from "../../../../Common/TabUtil.js";
import {WebEditor} from "../../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import RecordDescriptors from "../../../Commands/RecordDescriptors.js";

export default class MyWebAdvancedEditorProvider extends WebGridAdvancedEditorProvider {
    constructor() {
        super();
    }

    startEditing(targetEl, row, col, record, webAdvancedGrid, webGridAdvancedEditorMode) {
        super.startEditing(targetEl, row, col, record, webAdvancedGrid, webGridAdvancedEditorMode);
        let sizeTarget = DOM.getBoundingClientRect(targetEl);
        let columnConfig = webAdvancedGrid.columnConfigByColumnIndexSortedMap.get(col);
        if (columnConfig) {
            DOM.removeChildNodes(targetEl);
            let coreWindowTabFieldDTO = columnConfig.getEditorModel();
            let dataProviderAbstractJson = record.getRecordModelDTO() != null ? record.getRecordModelDTO().getFieldValues().get(coreWindowTabFieldDTO.getId()) : null;
            let dataProviderAbstract = RecordDescriptors.WebEditorValueConvert(dataProviderAbstractJson);
            TabUtil.createEditor(coreWindowTabFieldDTO, (id, instanceEditor) => {
                if (instanceEditor instanceof WebEditor) {
                    instanceEditor.setParent(webAdvancedGrid);
                    instanceEditor.onAttach(targetEl);
                    instanceEditor.makePositionable(false);
                    instanceEditor.setSize(sizeTarget.width, sizeTarget.height);
                    instanceEditor.setCoreWindowTabField(coreWindowTabFieldDTO);
                    instanceEditor.setRecord(record);
                    instanceEditor.setValue(dataProviderAbstract);

                    let columnArrayEditor = this.startEditorColumnarMap.get(col);
                    if (!columnArrayEditor) {
                        columnArrayEditor = []
                        this.startEditorColumnarMap.set(col, columnArrayEditor);
                    }
                    columnArrayEditor.push(instanceEditor);

                    this.fireEvent(EventFrameWork.event.Components.WebGridAdvancedEditorProvider.StartEditorInGrid, new BaseEvent(instanceEditor));
                }
            }, false);
            this.isStartEditing = true;
        }
    }

    stopEditor(editor) {
        super.stopEditor(editor);

        let coreWindowTabResponseSearchDTO = editor.getRecord();
        let coreWindowTabFieldDTO = editor.getCoreWindowTabField();
        let editorValue = editor.getValue();

        this.webAdvancedGrid.updateValue_RenderTableElementMapWithRecords_ByRecordIdAndColumnId(coreWindowTabResponseSearchDTO, coreWindowTabFieldDTO, editorValue);

        this.fireEvent(EventFrameWork.event.Components.WebGridAdvancedEditorProvider.StopEditorInGrid, new BaseEvent(editor))
    }
}
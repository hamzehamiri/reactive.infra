import TabUtil from "../../../Common/TabUtil.js";
import {WebEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import CoreLayoutAssignElementDTO from "../../../../Communicate/Models/Response/Layout/CoreLayoutAssignElementDTO.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class FormView extends HTMLContainer {

    constructor() {
        super();
        this.mapEditor = new Map();
    }

    setEditorsWithLayout(editorMap, coreLayoutAssignElementDTO, editorArraySorted) {
        if (editorMap) {
            this.mapEditor = editorMap;

            if (coreLayoutAssignElementDTO instanceof CoreLayoutAssignElementDTO) {
                TabUtil.layoutProcess(this, coreLayoutAssignElementDTO);
            } else {
                TabUtil.createDefaultLayoutAndLayoutData(this, editorArraySorted);
            }

            TabUtil.renderEditors(this, editorArraySorted);

            if (this.getAttached())
                this.layoutExecute();
        }
    }

    clearEditorValue() {
        this.mapEditor.forEach((editorInstance) => {
            editorInstance.setFieldChangeEvent(false);
            editorInstance.setValue(null);
            editorInstance.setFieldChangeEvent(true);
        });
    }

    bindRecordToUI(mapEditorValue) {
        this.clearEditorValue();
        mapEditorValue.forEach((editorValue, keyRecord) => {
            let editor = this.mapEditor.get(keyRecord);
            if (editor instanceof WebEditor) {
                editor.setFieldChangeEvent(false);
                editor.setValue(editorValue);
                editor.setFieldChangeEvent(true);
            }
        });
    }
}
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import TabUtil from "../../../Common/TabUtil.js";
import {WebEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import CoreWindowTabFieldDTO from "../../../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import CoreLayoutAssignElementDTO from "../../../../Communicate/Models/Response/Layout/CoreLayoutAssignElementDTO.js";
import LayoutFactory from "../../../Common/Factory/LayoutFactory.js";
import LayoutDataFactory from "../../../Common/Factory/LayoutDataFactory.js";
import CoreLayoutDataAssignElementDTO from "../../../../Communicate/Models/Response/Layout/CoreLayoutDataAssignElementDTO.js";
import CoreProcessParamDTO from "../../../../Communicate/Models/Response/Process/CoreProcessParamDTO.js";
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
                let LayoutInvoke = LayoutFactory.factory(coreLayoutAssignElementDTO.getCoreLayoutDTO().getRegisterKey());
                if (LayoutInvoke) {
                    let layoutInstance = new LayoutInvoke();
                    layoutInstance.applyData(coreLayoutAssignElementDTO.getJsonLayout());
                    this.setLayout(layoutInstance);
                } else {
                    this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
                }
            } else {
                TabUtil.createDefaultLayoutAndLayoutData(this, editorArraySorted);
            }

            editorArraySorted.forEach(webEditorInstance => {
                if (webEditorInstance instanceof WebEditor) {
                    let field = webEditorInstance.getCoreWindowTabField();
                    let coreProcessParamDTO = webEditorInstance.getCoreProcessParamDTO();
                    let coreLayoutDataAssignElementDTOMap;
                    if (field instanceof CoreWindowTabFieldDTO) {
                        coreLayoutDataAssignElementDTOMap = field.getCoreLayoutDataAssignElementDTOMap();
                    } else if (coreProcessParamDTO instanceof CoreProcessParamDTO) {
                        coreLayoutDataAssignElementDTOMap = coreProcessParamDTO.getCoreLayoutDataAssignElementDTOMap();
                    }
                    if (coreLayoutDataAssignElementDTOMap) {
                        coreLayoutDataAssignElementDTOMap.forEach((coreLayoutDataAssignElementDTO, id) => {
                            if (coreLayoutDataAssignElementDTO instanceof CoreLayoutDataAssignElementDTO) {
                                let LayoutDateInvoke = LayoutDataFactory.factory(coreLayoutDataAssignElementDTO.getCoreLayoutDataDTO().getRegisterKey());
                                if (LayoutDateInvoke) {
                                    let layoutDataInstance = new LayoutDateInvoke();
                                    layoutDataInstance.applyData(coreLayoutDataAssignElementDTO.getJsonLayoutData());
                                    this.addItem(webEditorInstance, layoutDataInstance, false);
                                } else {
                                    this.addItem(webEditorInstance, RowLayoutData.factory(1, 50, 0, 0, 3, 3, true), false);
                                }
                            }
                        });
                    }
                }
            });
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
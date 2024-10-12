import {BaseObservable} from "../../../../../UIFrameWork/Shared/Event/BaseObservable.js";
import EditorEvent from "../../../../../UIFrameWork/HTML/WebEditor/Common/EditorEvent.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import GridSelectionEvent from "../../../../../UIFrameWork/HTML/Cells/Grid/Advanced/GridSelectionEvent.js";
import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import {WebEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import CoreWindowTabResponseSearchDTO from "../../../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import TabRecordChangeHandlerEvent from "./TabRecordChangeHandlerEvent.js";

export default class TabRecordChangeHandler extends BaseObservable {

    constructor(tabController) {
        super();
        this.tabController = tabController;

        this.mapRecordChanged = new Map();
        this.mapRecordChangedOriginal = new Map();
    }

    getSelectedRecord() {
        // TODO bayad eslah shavad . alan faghat record akhar . vali badan form bayad betavand ba multi select kar konad
        return this.tabController.view.getGridView().getWebGridAdvanced().getGridModelSelection().getSelectRecordStack().peek();
    }

    bindStartMonitorChange() {
        let that = this;
        this.tabController.view.getGridView().getWebGridAdvanced().getGridModelSelection().addListener(EventFrameWork.event.Components.WebGridAdvanced.SelectionChange, (gridSelectionEvent) => {
            if (gridSelectionEvent instanceof GridSelectionEvent) {
            }
        }, this);

        this.tabController.view.getGridView().getWebGridAdvanced().getWebGridAdvancedEditorProvider().addListener(EventFrameWork.event.Components.WebGridAdvancedEditorProvider.StartEditorInGrid, (event) => {
            if (event instanceof BaseEvent) {
                let editor = event.getSource();
                if (editor instanceof WebEditor) {
                    editor.addListener(EventFrameWork.event.Editors.FieldChangeEvent, that.fieldChangeEvent, that);
                }
            }
        }, this);

        this.tabController.view.getGridView().getWebGridAdvanced().getWebGridAdvancedEditorProvider().addListener(EventFrameWork.event.Components.WebGridAdvancedEditorProvider.StopEditorInGrid, (event) => {
            if (event instanceof BaseEvent) {
                let editor = event.getSource();
                if (editor instanceof WebEditor) {
                    editor.removeListener(EventFrameWork.event.Editors.FieldChangeEvent, that);
                }
            }
        }, this);
    }

    fieldChangeEvent(editorEvent) {
        if (editorEvent instanceof EditorEvent) {
            let editor = editorEvent.getEditor();
            if (editor instanceof WebEditor) {
                let editorCoreWindowTabField = editor.getCoreWindowTabField();
                let editorValueChangedModel = editor.getValue();
                let editorRecordSource = editor.getRecord();

                let recordPk = this.tabController.getView().getGridView().getWebGridAdvanced().recordDescriptorForPk(editorRecordSource, this.tabController.getView().getGridView().webGridAdvanced);

                let targetRecord = this.mapRecordChanged.get(recordPk);
                if (!targetRecord) {
                    targetRecord = ConvertUtil.CloneForChangeRecord(editorRecordSource);
                    let originalRecord = ConvertUtil.CloneForChangeRecord(editorRecordSource);
                    this.mapRecordChanged.set(recordPk, targetRecord);
                    this.mapRecordChangedOriginal.set(recordPk, originalRecord);
                }

                if (targetRecord instanceof CoreWindowTabResponseSearchDTO) {
                    targetRecord.getRecordModelDTO().getFieldValues().set(editorCoreWindowTabField.getId(), editorValueChangedModel);
                }
                this.fireEvent(FormEngineEventFrameWork.event.TabController.TabRecordChangeHandler.TabRecordChangeHandler_FieldChangeEvent, new TabRecordChangeHandlerEvent(editor, targetRecord, editorCoreWindowTabField, editorValueChangedModel));
            }
        }
    }

    injectNewRecord(coreWindowTabResponseSearchDTO) {
        if (coreWindowTabResponseSearchDTO instanceof CoreWindowTabResponseSearchDTO) {

        }
    }

    getMapRecordChanged() {
        return this.mapRecordChanged;
    }

    getMapRecordChangedOriginal() {
        return this.mapRecordChangedOriginal;
    }

    getArrayRecordChanged() {
        let arrayRecordChange = [];
        this.mapRecordChanged.forEach((coreRecord, pk) => {
            arrayRecordChange.push(coreRecord);
        });
        return arrayRecordChange;
    }

    getArrayRecordChangedOriginal() {
        let arrayRecordChange = [];
        this.mapRecordChangedOriginal.forEach((coreRecord, pk) => {
            arrayRecordChange.push(coreRecord);
        });
        return arrayRecordChange;
    }
}
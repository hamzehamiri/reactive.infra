import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import WebERPSearchEditor from "../../../WebEditors/WebERPSearchEditor.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import CoreFilterAssignAbstract from "../../../../../Communicate/Models/Response/Filter/CoreFilterAssignAbstract.js";
import CoreFilterOperationDTO from "../../../../../Communicate/Models/Response/Filter/CoreFilterOperationDTO.js";
import CoreFilterOperationParamDTO from "../../../../../Communicate/Models/Response/Filter/CoreFilterOperationParamDTO.js";
import {WebComboBox} from "../../../../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import CoreWindowTabFieldDTO from "../../../../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import BaseEvent from "../../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import KeyValueDTO from "../../../../../Communicate/Common/DataProvider/Impl/KeyValueDTO.js";
import TabUtil from "../../../../Common/TabUtil.js";
import {Util} from "../../../../../../UIFrameWork/Shared/Common/Util.js";
import ConvertUtil from "../../../../../Communicate/Common/ConvertUtil.js";
import CoreFilterAssignFieldDTO from "../../../../../Communicate/Models/Response/Filter/Field/CoreFilterAssignFieldDTO.js";
import {WebEditor} from "../../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class FilterViewRowLineGenerator extends HTMLContainer {
    constructor(filterOptionMap) {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        this.editorOperationParamMap = new Map();

        let field_CoreWindowTabFieldDTO = new CoreWindowTabFieldDTO();
        field_CoreWindowTabFieldDTO.setCoreTabId(1);
        field_CoreWindowTabFieldDTO.setId(1);

        let operation_CoreWindowTabFieldDTO = new CoreWindowTabFieldDTO();
        operation_CoreWindowTabFieldDTO.setCoreTabId(2);
        operation_CoreWindowTabFieldDTO.setId(2);

        this.fieldCombobox = new WebERPSearchEditor(WebComboBox.SelectionModeData.SelectedModeSingle, true);
        this.fieldCombobox.setGeneratePlaceHolderLabel("Field");
        this.fieldCombobox.setCoreWindowTabField(field_CoreWindowTabFieldDTO);
        this.fieldCombobox.addListener(EventFrameWork.event.Editors.FieldChangeEvent, this.fieldSelected, this);
        this.fieldCombobox.addListener(WebERPSearchEditor.EventList.ListViewShowService, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let coreWindowTabFieldSearchRequestDTO = baseEvent.getSource();
                this.bindServiceFieldEditor(coreWindowTabFieldSearchRequestDTO, this.fieldCombobox);
            }
        }, this);

        this.filterOperationCombobox = new WebERPSearchEditor(WebComboBox.SelectionModeData.SelectedModeSingle, true);
        this.filterOperationCombobox.setGeneratePlaceHolderLabel("Operation");
        this.filterOperationCombobox.setCoreWindowTabField(operation_CoreWindowTabFieldDTO);
        this.filterOperationCombobox.addListener(EventFrameWork.event.Editors.FieldChangeEvent, this.filterOperationSelected, this);
        this.filterOperationCombobox.addListener(WebERPSearchEditor.EventList.ListViewShowService, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let coreWindowTabFieldSearchRequestDTO = baseEvent.getSource();
                this.bindServiceFilterOperationEditor(coreWindowTabFieldSearchRequestDTO, this.filterOperationCombobox);
            }
        }, this);

        this.containerEditor = new HTMLContainer();
        this.containerEditor.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        if (filterOptionMap && !filterOptionMap.get(FilterViewRowLineGenerator.Options.FieldEditorShow)) {
            this.addItem(this.filterOperationCombobox, RowLayoutData.factory(0.5, 1, 2, 2, 1, 1, true));
            this.addItem(this.containerEditor, RowLayoutData.factory(0.5, 1, 2, 2, 1, 1, true));
        } else {
            this.addItem(this.fieldCombobox, RowLayoutData.factory(0.3, 1, 2, 2, 1, 1, true));
            this.addItem(this.filterOperationCombobox, RowLayoutData.factory(0.2, 1, 2, 2, 1, 1, true));
            this.addItem(this.containerEditor, RowLayoutData.factory(0.5, 1, 2, 2, 1, 1, true));
        }
    }

    setCoreTranslateDTOMap(coreTranslateDTOMap) {
        this.coreTranslateDTOMap = coreTranslateDTOMap;
        if (coreTranslateDTOMap.get(FilterViewRowLineGenerator.Constant.ModelField))
            this.fieldCombobox.setGeneratePlaceHolderLabel(coreTranslateDTOMap.get(FilterViewRowLineGenerator.Constant.ModelField).getTranslateValue());
        if (coreTranslateDTOMap.get(FilterViewRowLineGenerator.Constant.ModelOperation))
            this.filterOperationCombobox.setGeneratePlaceHolderLabel(coreTranslateDTOMap.get(FilterViewRowLineGenerator.Constant.ModelOperation).getTranslateValue());
    }

    fieldSelected() {
        this.filterOperationCombobox.setValue(null);
    }

    filterOperationSelected() {
        this.editorOperationParamMap.clear();
        this.containerEditor.clearItems();

        let filterOperationValue = this.filterOperationCombobox.getValue();
        if (filterOperationValue instanceof KeyValueDTO) {
            let coreFilterOperationDTO = filterOperationValue.getKey();
            if (coreFilterOperationDTO instanceof CoreFilterOperationDTO) {
                let fieldKeyValueDTO = this.fieldCombobox.getValue();
                if (fieldKeyValueDTO instanceof KeyValueDTO) {
                    let coreWindowTabFieldDTO = fieldKeyValueDTO.getKey();
                    let coreTableColumnDataProviderDTO = TabUtil.getDataProviderFromField(coreWindowTabFieldDTO);
                    for (let [key, coreFilterOperationParamDTO] of coreFilterOperationDTO.getCoreFilterOperationParamDTOMap()) {
                        if (coreFilterOperationParamDTO instanceof CoreFilterOperationParamDTO) {
                            let consumerEditor = (id, editorInstance) => {
                                editorInstance.setData(FilterViewRowLineGenerator.Constant.CoreFilterOperationParamDTO, Util.ClonePrimary(coreFilterOperationParamDTO));
                                this.editorOperationParamMap.set(coreFilterOperationParamDTO.getId(), editorInstance);
                            }
                            if (coreFilterOperationParamDTO.getReferOriginalEditor()) {
                                TabUtil.createEditor(coreWindowTabFieldDTO, consumerEditor, true, coreFilterOperationParamDTO.getTranslate(), true);
                            } else {
                                let editorClassRegisterKey = coreFilterOperationParamDTO.getCoreTableColumnEditorDTO().getEditorClassRegisterKey();
                                TabUtil.createEditorSpecial(editorClassRegisterKey, consumerEditor, true, coreWindowTabFieldDTO, coreFilterOperationParamDTO.getTitle(), false, coreTableColumnDataProviderDTO, coreWindowTabFieldDTO.getId());
                            }
                        }
                    }
                    let widthEditorPercent = 1 / this.editorOperationParamMap.size;
                    for (let [key, editor] of this.editorOperationParamMap) {
                        this.containerEditor.addItem(editor, RowLayoutData.factory(widthEditorPercent, 1, 1, 1, 1, 1, true));
                    }
                    if (this.getAttached())
                        this.containerEditor.layoutExecute();
                }
            }
        }
    }

    bindServiceFilterOperationEditor(coreWindowTabFieldSearchRequestDTO, editorInstance) {
        let val = this.fieldCombobox.getValue();
        if (editorInstance instanceof WebERPSearchEditor) {
            let pageDataDTOArray = [];
            let coreFilterOperationDTOArray = this.baseModeForFilter.FilterOperationsMap.get(val.getKey().getId());
            if (coreFilterOperationDTOArray) {
                coreFilterOperationDTOArray.forEach((coreFilterOperationDTO) => {
                    if (coreFilterOperationDTO instanceof CoreFilterOperationDTO) {
                        let keyValueDTO = ConvertUtil.ConvertCoreFilterOperationDTOToKeyValueDTO(coreFilterOperationDTO);
                        let pageDataDTO = ConvertUtil.ConvertKeyValueDTOToPageDataDTO(coreFilterOperationDTO.getId(), keyValueDTO);
                        pageDataDTOArray.push(pageDataDTO);
                    }
                });
            }
            editorInstance.convertPageDTOToUI(pageDataDTOArray);
        }
    }

    bindServiceFieldEditor(coreWindowTabFieldSearchRequestDTO, editorInstance) {
        if (editorInstance instanceof WebERPSearchEditor) {
            // let pageDataDTOArray = [];
            // this.baseModeForFilter.FieldMap.forEach((coreWindowTabFieldDTO, key) => {
            //     if (coreWindowTabFieldDTO instanceof CoreWindowTabFieldDTO) {
            //         let keyValueDTO = ConvertUtil.ConvertCoreWindowTabFieldToKeyValueDTO(coreWindowTabFieldDTO);
            //         let pageDataDTO = ConvertUtil.ConvertKeyValueDTOToPageDataDTO(coreWindowTabFieldDTO.getId(), keyValueDTO);
            //
            //         pageDataDTOArray.push(pageDataDTO);
            //     }
            // });
            editorInstance.convertPageDTOToUI(TabUtil.ConvertCoreWindowTabToPageDataDTOs(this.baseModeForFilter.FieldMap));
        }
    }

    rebindModelToUI(coreWindowTabFieldDTO, coreFilterOperationDTO, coreFilterOperationParamValueMap) {
        if (coreWindowTabFieldDTO) {
            let coreWindowTabFieldDTO_KeyValueDTO = ConvertUtil.ConvertCoreWindowTabFieldToKeyValueDTO(coreWindowTabFieldDTO);
            this.fieldCombobox.setValue(coreWindowTabFieldDTO_KeyValueDTO);
        }

        if (coreFilterOperationDTO) {
            let coreFilterOperationDTO_KeyValueDTO = ConvertUtil.ConvertCoreFilterOperationDTOToKeyValueDTO(coreFilterOperationDTO);
            this.filterOperationCombobox.setValue(coreFilterOperationDTO_KeyValueDTO);

            if (this.editorOperationParamMap && coreFilterOperationDTO instanceof CoreFilterOperationDTO) {
                this.editorOperationParamMap.forEach((editorInstance, coreFilterOperationParamDTOId) => {
                    if (editorInstance instanceof WebEditor) {
                        let coreFilterOperationParamDTO = coreFilterOperationDTO.getCoreFilterOperationParamDTOMap().get(coreFilterOperationParamDTOId.toString());
                        if (coreFilterOperationParamDTO instanceof CoreFilterOperationParamDTO && coreFilterOperationParamDTO.getTranslate()) {
                            editorInstance.setGeneratePlaceHolderLabel(coreFilterOperationParamDTO.getTranslate());
                        }
                        editorInstance.setValue(coreFilterOperationParamValueMap.get(coreFilterOperationParamDTOId));
                    }
                });
            }
        }
    }

    bindModelToUi(coreFilterAssignAbstract, key, baseModeForFilter) {
        if (coreFilterAssignAbstract instanceof CoreFilterAssignAbstract) {
            this.baseModeForFilter = baseModeForFilter;
            if (coreFilterAssignAbstract.getRegisterKey() === 'Field') {
                let coreFilterAssignFieldDTO = new CoreFilterAssignFieldDTO();
                coreFilterAssignFieldDTO.applyData(coreFilterAssignAbstract);

                let keyValueDTO = ConvertUtil.ConvertCoreWindowTabFieldToKeyValueDTO(coreFilterAssignFieldDTO.getCoreWindowTabFieldDTO());
                this.fieldCombobox.setValue(keyValueDTO);
            }
        }
    }

    bindFinalModelToUi(coreWindowTabFieldDTO, coreFilterOperationDTO, mapEditor, baseModeForFilter) {
        this.baseModeForFilter = baseModeForFilter;

        let keyValueDTO = ConvertUtil.ConvertCoreWindowTabFieldToKeyValueDTO(coreWindowTabFieldDTO);
        this.fieldCombobox.setValue(keyValueDTO);

        let coreFilterOperationDTO_KeyValueDTO = ConvertUtil.ConvertCoreFilterOperationDTOToKeyValueDTO(coreFilterOperationDTO);
        this.filterOperationCombobox.setValue(coreFilterOperationDTO_KeyValueDTO);

        this.filterOperationSelected();

        if (coreFilterOperationDTO instanceof CoreFilterOperationDTO) {
            for (let [coreFilterOperationParamDTOId, editorInstance] of this.editorOperationParamMap) {
                editorInstance.setValue(mapEditor.get(coreFilterOperationParamDTOId));
            }
        }
    }

    bindUiToModel() {
        let fieldValue = this.fieldCombobox.getValue();
        let filterOperationValue = this.filterOperationCombobox.getValue();

        let mapValueOperationParamMap = new Map();

        for (let [coreFilterOperationParamDTOId, editorInstance] of this.editorOperationParamMap) {
            if (editorInstance instanceof WebEditor) {
                mapValueOperationParamMap.set(coreFilterOperationParamDTOId, editorInstance.getValue());
            }
        }

        return {
            [FilterViewRowLineGenerator.Constant.ModelFieldEditorValue]: fieldValue,
            [FilterViewRowLineGenerator.Constant.ModelFilterOperationEditorValue]: filterOperationValue,
            [FilterViewRowLineGenerator.Constant.ModelFilterOperationParamValueMap]: mapValueOperationParamMap
        }
    }

    getEditorOperationParamMap() {
        return this.editorOperationParamMap;
    }
}

FilterViewRowLineGenerator.Options = {
    FieldEditorShow: 'FieldEditorShow'
}

FilterViewRowLineGenerator.Constant = {
    ModelField: 'field',
    ModelOperation: 'operation',
    CoreFilterOperationParamDTO: 'CoreFilterOperationParamDTO',
    ModelData: 'ModelData',
    ModelDataKey: 'ModelDataKey',
    ModelFieldEditorValue: 'ModelFieldEditorValue',
    ModelFilterOperationEditorValue: 'ModelFilterOperationEditorValue',
    ModelFilterOperationParamValueMap: 'ModelFilterOperationParamValueMap'
}
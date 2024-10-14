import WebEditorFactory from "../FormEngine/WebEditors/Factory/WebEditorFactory.js";
import {WebEditor} from "../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {WebColumnConfig} from "../../../UIFrameWork/HTML/Cells/Grid/Standard/WebColumnConfig.js";
import CoreTableColumnDataProviderDTO from "../../Communicate/Models/Response/Table/Column/CoreTableColumnDataProviderDTO.js";
import SerializerFactory from "../FormEngine/WebEditors/Serializers/SerializerFactory.js";
import CoreTableColumnDataProviderWithSerializerDTO from "../../Communicate/Models/Response/Table/Column/CoreTableColumnDataProviderWithSerializerDTO.js";
import CoreFilterAssignAbstract from "../../Communicate/Models/Response/Filter/CoreFilterAssignAbstract.js";
import CoreFilterAssignFieldDTO from "../../Communicate/Models/Response/Filter/Field/CoreFilterAssignFieldDTO.js";
import ResponsiveTableLayout from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayout.js";
import ResponsiveTableLayoutData from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayoutData.js";
import ResponsiveTableLayoutDataElement from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayoutDataElement.js";
import PageType from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveCommon/PageType.js";
import CoreLayoutDataAssignElementDTO from "../../Communicate/Models/Response/Layout/CoreLayoutDataAssignElementDTO.js";
import CoreLayoutDataDTO from "../../Communicate/Models/Response/Layout/CoreLayoutDataDTO.js";
import CoreWindowTabFieldDTO from "../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import ConvertUtil from "../../Communicate/Common/ConvertUtil.js";
import TabRecordChangeHandler from "../FormEngine/Tab/Controller/TabRecordChangeHandler.js";
import CoreWindowTabResponseSearchDTO from "../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import MenuFactory from "../Menu/MenuFactory.js";
import CoreProcessParamDTO from "../../Communicate/Models/Response/Process/CoreProcessParamDTO.js";
import CoreTableColumnEditorDTO from "../../Communicate/Models/Response/Table/Column/CoreTableColumnEditorDTO.js";
import CoreWindowTabDTO from "../../Communicate/Models/Response/Window/Tab/CoreWindowTabDTO.js";
import CoreWindowTabJoinColumnDTO from "../../Communicate/Models/Response/Window/Tab/CoreWindowTabJoinColumnDTO.js";
import LayoutDataFactory from "./Factory/LayoutDataFactory.js";
import {RowLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import LayoutFactory from "./Factory/LayoutFactory.js";
import {RowLayout, RowLayout_Mode} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import CoreWindowTabFilterFieldDTO from "../../Communicate/Models/Response/Window/Tab/Filter/CoreWindowTabFilterFieldDTO.js";

export default class TabUtil {

    static mergeCoreWindowTabResponseSearchDTOWithTabChangeRecords(coreWindowTabResponseSearchDTO, tabRecordChangeHandler, tabController) {
        if (tabRecordChangeHandler instanceof TabRecordChangeHandler) {
            let recordPk = tabController.getView().getGridView().getWebGridAdvanced().recordDescriptorForPk(coreWindowTabResponseSearchDTO, tabController.getView().getGridView().webGridAdvanced);
            let changedRecord = tabRecordChangeHandler.getMapRecordChanged().get(recordPk);
            if (coreWindowTabResponseSearchDTO instanceof CoreWindowTabResponseSearchDTO && changedRecord instanceof CoreWindowTabResponseSearchDTO) {
                changedRecord.getRecordModelDTO().getFieldValues().forEach((dataProviderInterface, fieldId) => {
                    coreWindowTabResponseSearchDTO.getRecordModelDTO().getFieldValues().set(fieldId, dataProviderInterface);
                    coreWindowTabResponseSearchDTO.getRecordModelDTO().addFieldChanges(fieldId, dataProviderInterface);
                });
            }

        }
    }

    static startSortButton(coreWindowTabButtonDTOMapSimpleButton) {
        let sortIndex = [...coreWindowTabButtonDTOMapSimpleButton.entries()].sort((a, b) => {
            return a[1].getButtonKey().getButtonIndex() - b[1].getButtonKey().getButtonIndex();
        });

        let sortedSimpleButtonArray = [];
        sortIndex.forEach(value => {
            let simpleButton = value[1];
            sortedSimpleButtonArray.push(simpleButton);
        });
        return sortedSimpleButtonArray;
    }

    static startRefactorTreeTabDTOMap(coreWindowTabDTOMap) {
        coreWindowTabDTOMap.forEach((coreWindowTabDTO) => {
            if (coreWindowTabDTO instanceof CoreWindowTabDTO && coreWindowTabDTO.getCoreWindowTabJoinColumnDTOMap()) {
                coreWindowTabDTO.getCoreWindowTabJoinColumnDTOMap().forEach((coreWindowTabJoinColumnDTO) => {
                    if (coreWindowTabJoinColumnDTO instanceof CoreWindowTabJoinColumnDTO) {
                        let coreWindowTabDTOParent = coreWindowTabDTOMap.get(coreWindowTabJoinColumnDTO.getCoreWindowTabMasterId().toString());
                        if (coreWindowTabDTOParent) {
                            coreWindowTabDTO.setCoreWindowTabDTOParent(coreWindowTabDTOParent);
                            coreWindowTabDTO.setCoreWindowTabJoinColumnDTOParent(coreWindowTabJoinColumnDTO);
                        }
                    }
                });
            }
        });
    }

    static startSortTabWithTreeStructure(coreWindowTabDTOMap, coreWindowTabDTOParent) {
        let coreWindowTabDTOArray = [];
        coreWindowTabDTOMap.forEach((coreWindowTabDTO) => {
            if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
                if (coreWindowTabDTOParent === null) {
                    if (!coreWindowTabDTO.getCoreWindowTabDTOParent())
                        coreWindowTabDTOArray.push(coreWindowTabDTO);
                } else {
                    if (coreWindowTabDTO.getCoreWindowTabDTOParent() && coreWindowTabDTO.getCoreWindowTabDTOParent().getId() === coreWindowTabDTOParent.getId()) {
                        coreWindowTabDTOArray.push(coreWindowTabDTO);
                    }
                }
            }
        })
        coreWindowTabDTOArray.sort((coreWindowTabDTOBefore, coreWindowTabDTONext) => {
            return coreWindowTabDTOBefore.getTabIndex() - coreWindowTabDTONext.getTabIndex();
        });

        return coreWindowTabDTOArray;
    }

    static startSortTab(coreWindowTabDTOMap) {
        let sortIndex = [...coreWindowTabDTOMap.entries()].sort((a, b) => {
            return a[1].getTabIndex() - b[1].getTabIndex();
        });

        let newSortedTabArray = [];
        sortIndex.forEach(value => {
            let coreWindowTabDTO = value[1];
            newSortedTabArray.push(coreWindowTabDTO);
        });
        return newSortedTabArray;
    }

    static startSortProcessParam(editorMap) {
        let sortIndex = [...editorMap.entries()].sort((webEditorBefore, webEditorNext) => {
            return webEditorBefore[1].getCoreProcessParamDTO().getIndex() - webEditorNext[1].getCoreProcessParamDTO().getIndex();
        });
        return TabUtil.convertMapToArray(sortIndex);
    }

    static startSortField(editorMap) {
        let sortIndex = [...editorMap.entries()].sort((webEditorBefore, webEditorNext) => {
            return webEditorBefore[1].getCoreWindowTabField().getColumnIndex() - webEditorNext[1].getCoreWindowTabField().getColumnIndex();
        });
        return TabUtil.convertMapToArray(sortIndex);
    }

    static convertMapToArray(sortIndex) {
        let newSortedEditorArray = [];
        sortIndex.forEach(value => {
            let editor = value[1];
            newSortedEditorArray.push(editor);
        });
        return newSortedEditorArray;
    }

    static createEditorFromCoreWindowTabDTO(coreWindowTabDTO, editorConsumer, columnConfigConsumer) {
        let coreWindowTabFieldDTOMap = coreWindowTabDTO.getCoreWindowTabFieldDTOMap();
        for (let [, coreWindowTabFieldDTO] of coreWindowTabFieldDTOMap) {
            if (coreWindowTabFieldDTO.getActive()) {
                TabUtil.createEditor(coreWindowTabFieldDTO, editorConsumer, true, coreWindowTabFieldDTO.getTranslate(), true);
                columnConfigConsumer(coreWindowTabFieldDTO.getColumnIndex(), TabUtil.createColumnConfigWithMetaData(coreWindowTabFieldDTO, coreWindowTabFieldDTO.getColumnIndex()), coreWindowTabFieldDTO.getCoreTableColumnDTO() != null && coreWindowTabFieldDTO.getCoreTableColumnDTO().getPk(), coreWindowTabFieldDTO);
            }
        }
    }

    static createEditorFromCoreWindowTabFilterDTO(coreWindowTabFilterDTO, editorConsumer) {
        let coreWindowTabFilterFieldDTOMap = coreWindowTabFilterDTO.getCoreWindowTabFilterFieldDTOMap();
        if (coreWindowTabFilterFieldDTOMap)
            for (let [, coreWindowTabFilterFieldDTO] of coreWindowTabFilterFieldDTOMap) {
                if (coreWindowTabFilterFieldDTO instanceof CoreWindowTabFilterFieldDTO) {
                    let coreWindowTabFieldDTO = coreWindowTabFilterFieldDTO.getCoreWindowTabFieldDTO();
                    let coreTableColumnEditorDTO = coreWindowTabFilterFieldDTO.getCoreTableColumnEditorDTO();
                    if (coreWindowTabFieldDTO.getActive()) {
                        TabUtil.createEditor(coreWindowTabFieldDTO, editorConsumer, true, coreWindowTabFieldDTO.getTranslate(), true, coreTableColumnEditorDTO);
                    }
                }
            }
    }

    static createEditorFromCoreProcessDTO(coreProcessDTO, editorConsumer) {
        let coreProcessParamDTOMap = coreProcessDTO.getCoreProcessParamDTOMap();
        for (let [, coreProcessParamDTO] of coreProcessParamDTOMap) {
            if (coreProcessParamDTO instanceof CoreProcessParamDTO) {
                if (coreProcessParamDTO.getActive()) {
                    let coreTableColumnEditorDTO = coreProcessParamDTO.getCoreTableColumnEditorDTO();
                    if (coreTableColumnEditorDTO instanceof CoreTableColumnEditorDTO) {
                        let editorClassRegisterKey = coreTableColumnEditorDTO.getEditorClassRegisterKey();
                        TabUtil.createEditorSpecial(editorClassRegisterKey, editorConsumer, true, coreProcessParamDTO, coreProcessParamDTO.getTranslate(), true, coreProcessParamDTO.getCoreTableColumnDataProviderDTO(), coreProcessParamDTO.getId());
                    }
                }
            }
        }
    }

    static createWebEditorValueSerializer(coreTableColumnDataProviderDTO) {
        if (coreTableColumnDataProviderDTO instanceof CoreTableColumnDataProviderDTO) {
            let coreTableColumnDataProviderWithSerializerDTO = coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO();
            if (coreTableColumnDataProviderWithSerializerDTO instanceof CoreTableColumnDataProviderWithSerializerDTO) {
                return SerializerFactory.factory(coreTableColumnDataProviderWithSerializerDTO.getCoreTableColumnDataProviderSerializerDTO());
            }
        }
    }

    static createEditorSpecial(editorClassRegisterKey, editorConsumer, placeHolder, coreWindowTabFieldDTOOrProcessParamDTO, placeHolderLabel, filterMode, coreTableColumnDataProviderDTO, key) {
        let EditorInvoke = WebEditorFactory.factory(editorClassRegisterKey);
        if (EditorInvoke) {
            let instanceEditor = new EditorInvoke();

            if (instanceEditor instanceof WebEditor) {
                MenuFactory.CreateWebEditorMenu(instanceEditor);
                instanceEditor.setFilterMode(filterMode);

                if (coreTableColumnDataProviderDTO instanceof CoreTableColumnDataProviderDTO) {
                    let coreTableColumnDataProviderWithSerializerDTO = coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO();
                    if (coreTableColumnDataProviderWithSerializerDTO instanceof CoreTableColumnDataProviderWithSerializerDTO) {
                        let WebEditorValueSerializerInvoke = TabUtil.createWebEditorValueSerializer(coreTableColumnDataProviderDTO);

                        if (WebEditorValueSerializerInvoke) {
                            if (coreWindowTabFieldDTOOrProcessParamDTO instanceof CoreWindowTabFieldDTO) {
                                instanceEditor.setCoreWindowTabField(coreWindowTabFieldDTOOrProcessParamDTO);
                            } else if (coreWindowTabFieldDTOOrProcessParamDTO instanceof CoreProcessParamDTO) {
                                instanceEditor.setCoreProcessParamDTO(coreWindowTabFieldDTOOrProcessParamDTO);
                            }
                            instanceEditor.setWebEditorValueSerializer(new WebEditorValueSerializerInvoke(coreTableColumnDataProviderWithSerializerDTO));
                            if (placeHolder)
                                instanceEditor.setGeneratePlaceHolderLabel(placeHolderLabel);
                            editorConsumer(key, instanceEditor);
                        }
                    }
                }
            }
        }
    }

    static createEditor(coreWindowTabFieldDTO, editorConsumer, placeHolder, placeHolderLabel, filterMode, forceCoreTableColumnEditorDTO) {
        let column = coreWindowTabFieldDTO.getCoreTableColumnDTO();
        let coreTableColumnEditorDTO = forceCoreTableColumnEditorDTO != null ? forceCoreTableColumnEditorDTO : (coreWindowTabFieldDTO.getCoreTableColumnEditorDTO() != null ? coreWindowTabFieldDTO.getCoreTableColumnEditorDTO() : column.getCoreTableColumnEditorDTO());
        let coreTableColumnDataProviderDTO = TabUtil.getDataProviderFromField(coreWindowTabFieldDTO);
        let editorClassRegisterKey = coreTableColumnEditorDTO.getEditorClassRegisterKey();
        TabUtil.createEditorSpecial(editorClassRegisterKey, editorConsumer, placeHolder, coreWindowTabFieldDTO, placeHolderLabel, filterMode, coreTableColumnDataProviderDTO, coreWindowTabFieldDTO.getId());
    }

    static getDataProviderFromField(field) {
        return field.getCoreTableColumnDataProviderDTO() != null ? field.getCoreTableColumnDataProviderDTO() : (field.getCoreTableColumnDTO() != null ? field.getCoreTableColumnDTO().getCoreTableColumnDataProviderDTO() : null);
    }

    static ConvertCoreWindowTabToPageDataDTOs(coreWindowTabFieldMap) {
        let pageDataDTOArray = [];
        coreWindowTabFieldMap.forEach((coreWindowTabFieldDTO, key) => {
            if (coreWindowTabFieldDTO instanceof CoreWindowTabFieldDTO) {
                let keyValueDTO = ConvertUtil.ConvertCoreWindowTabFieldToKeyValueDTO(coreWindowTabFieldDTO);
                let pageDataDTO = ConvertUtil.ConvertKeyValueDTOToPageDataDTO(coreWindowTabFieldDTO.getId(), keyValueDTO);

                pageDataDTOArray.push(pageDataDTO);
            }
        });
        return pageDataDTOArray;
    }

    static ConvertCoreFilterAssignAbstract(coreFilterAssignAbstract) {
        if (coreFilterAssignAbstract.getRegisterKey() === 'Field') {
            let coreFilterAssignFieldDTO = new CoreFilterAssignFieldDTO();
            coreFilterAssignFieldDTO.applyData(coreFilterAssignAbstract);
            return coreFilterAssignFieldDTO;
        }
        return null;
    }

    static ConvertCoreFilterAssignAbstractMapToBaseModeForFilter(coreFilterAssignAbstractMap) {
        let coreWindowTabFieldDTOMap = new Map();
        let coreFilterOperationDTOMapPerFieldId = new Map();
        coreFilterAssignAbstractMap.forEach((coreFilterAssignAbstract, key) => {
            if (coreFilterAssignAbstract instanceof CoreFilterAssignAbstract) {
                if (coreFilterAssignAbstract.getRegisterKey() === 'Field') {
                    let coreFilterAssignFieldDTO = TabUtil.ConvertCoreFilterAssignAbstract(coreFilterAssignAbstract);

                    coreWindowTabFieldDTOMap.set(coreFilterAssignFieldDTO.getCoreWindowTabFieldDTO().getId(), coreFilterAssignFieldDTO.getCoreWindowTabFieldDTO());

                    if (coreFilterAssignFieldDTO.getCoreFilterDTOMap().size) {
                        let coreFilterOperationDTOMapFinal = coreFilterOperationDTOMapPerFieldId.get(coreFilterAssignFieldDTO.getCoreWindowTabFieldDTO().getId());
                        if (!coreFilterOperationDTOMapFinal) {
                            coreFilterOperationDTOMapFinal = new Map();
                            coreFilterOperationDTOMapPerFieldId.set(coreFilterAssignFieldDTO.getCoreWindowTabFieldDTO().getId(), coreFilterOperationDTOMapFinal);
                        }

                        coreFilterAssignFieldDTO.getCoreFilterDTOMap().forEach((coreFilterDTO, id) => {
                            coreFilterDTO.getCoreFilterOperationDTOMap().forEach((coreFilterOperationDTO, id) => {
                                coreFilterOperationDTOMapFinal.set(coreFilterOperationDTO.getId(), coreFilterOperationDTO);
                            });
                        });
                    }
                }
            }
        });
        return {
            "FieldMap": coreWindowTabFieldDTOMap,
            "FilterOperationsMap": coreFilterOperationDTOMapPerFieldId
        }
    }

    static createColumnConfigWithMetaData(coreWindowTabFieldDTO, columnIndex) {
        let webColumnConfig = new WebColumnConfig();
        webColumnConfig.setKeyForModelCell(coreWindowTabFieldDTO.getId());
        webColumnConfig.setDisplay(coreWindowTabFieldDTO.getTranslate());
        webColumnConfig.setFixWidth(100);
        webColumnConfig.setColumnIndex(columnIndex);
        webColumnConfig.setEditorModel(coreWindowTabFieldDTO);
        return webColumnConfig;
    }

    static createDefaultLayoutAndLayoutDataFilterTab(container, editorArraySorted) {
        let rowLayout = new RowLayout(RowLayout_Mode.Vertical);
        container.setLayout(rowLayout);

        editorArraySorted.forEach((webEditorInstance) => {
            if (webEditorInstance instanceof WebEditor) {

                let coreLayoutDataDTO = new CoreLayoutDataDTO();
                coreLayoutDataDTO.setRegisterKey("row_layout_data");

                let rowLayoutData = RowLayoutData.factory(1, 1 / editorArraySorted.length, 3, 3, 3, 3, true, false)

                let coreLayoutDataAssignElementDTO = new CoreLayoutDataAssignElementDTO();
                coreLayoutDataAssignElementDTO.setId(2);
                coreLayoutDataAssignElementDTO.setJsonLayoutData(rowLayoutData.toJsonString());
                coreLayoutDataAssignElementDTO.setCoreLayoutDataDTO(coreLayoutDataDTO);

                let coreLayoutDataAssignElementDTOMap = new Map();
                coreLayoutDataAssignElementDTOMap.set(coreLayoutDataAssignElementDTO.getId(), coreLayoutDataAssignElementDTO);

                let coreWindowTabField = webEditorInstance.getCoreWindowTabField();
                let coreProcessParamDTO = webEditorInstance.getCoreProcessParamDTO();
                if (coreWindowTabField) {
                    coreWindowTabField.setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap);
                }
                if (coreProcessParamDTO) {
                    coreProcessParamDTO.setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap);
                }
            }
        })
    }

    static createDefaultLayoutAndLayoutData(container, editorArraySorted) {
        let responsiveTableLayout = new ResponsiveTableLayout();
        responsiveTableLayout.setPadding(12, "px");
        container.setLayout(responsiveTableLayout);

        let smallPageJson = {
            fromWidth: 1,
            toWidth: 1000,
            isMobile: false
        }
        let midPageJson = {
            fromWidth: 1001,
            toWidth: 1500,
            isMobile: false
        }

        let largePageJson = {
            fromWidth: 1501,
            toWidth: 3000,
            isMobile: false
        }

        let pageSmall = new PageType();
        pageSmall.applyData(smallPageJson);
        let pageMid = new PageType();
        pageMid.applyData(midPageJson);
        let pageLarge = new PageType();
        pageLarge.applyData(largePageJson);

        let indexEditorVisible = 1;
        let pageCurrentData = [
            [1, 1],
            [1, 1],
            [1, 1]
        ]

        editorArraySorted.forEach((webEditorInstance) => {
            if (webEditorInstance instanceof WebEditor) {
                if (webEditorInstance.getVisible()) {
                    let coreLayoutDataDTO = new CoreLayoutDataDTO();
                    coreLayoutDataDTO.setRegisterKey("responsive_table_layout_data");

                    let editorDataLayout = new ResponsiveTableLayoutData();
                    editorDataLayout.addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageSmall, pageCurrentData[0][0], pageCurrentData[0][1], 0, 0));
                    editorDataLayout.addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageMid, pageCurrentData[1][0], pageCurrentData[1][1], 0, 0));
                    editorDataLayout.addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageLarge, pageCurrentData[2][0], pageCurrentData[2][1], 0, 0));

                    pageCurrentData[0][0] = pageCurrentData[0][0];
                    pageCurrentData[0][1] = pageCurrentData[0][1] + 1;

                    if (indexEditorVisible % 2 === 0) {
                        pageCurrentData[1][0] = 1;
                        pageCurrentData[1][1] = pageCurrentData[1][1] + 1;
                    } else {
                        pageCurrentData[1][0] = pageCurrentData[1][0] + 1;
                    }
                    if (indexEditorVisible % 3 === 0) {
                        pageCurrentData[2][0] = 1;
                        pageCurrentData[2][1] = pageCurrentData[2][1] + 1;
                    } else {
                        pageCurrentData[2][0] = pageCurrentData[2][0] + 1;
                    }

                    let coreLayoutDataAssignElementDTO = new CoreLayoutDataAssignElementDTO();
                    coreLayoutDataAssignElementDTO.setId(1);
                    coreLayoutDataAssignElementDTO.setJsonLayoutData(editorDataLayout.toJsonString());
                    coreLayoutDataAssignElementDTO.setCoreLayoutDataDTO(coreLayoutDataDTO);

                    let coreLayoutDataAssignElementDTOMap = new Map();
                    coreLayoutDataAssignElementDTOMap.set(coreLayoutDataAssignElementDTO.getId(), coreLayoutDataAssignElementDTO);

                    let coreWindowTabField = webEditorInstance.getCoreWindowTabField();
                    let coreProcessParamDTO = webEditorInstance.getCoreProcessParamDTO();
                    if (coreWindowTabField) {
                        coreWindowTabField.setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap);
                    }
                    if (coreProcessParamDTO) {
                        coreProcessParamDTO.setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap);
                    }

                    indexEditorVisible++;
                }
            }
        });
    }


    static renderEditors(container, editorArraySorted) {
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
                                container.addItem(webEditorInstance, layoutDataInstance, false);
                            } else {
                                container.addItem(webEditorInstance, RowLayoutData.factory(1, 50, 0, 0, 3, 3, true), false);
                            }
                        }
                    });
                }
            }
        });
    }

    static layoutProcess(container, coreLayoutAssignElementDTO) {
        let LayoutInvoke = LayoutFactory.factory(coreLayoutAssignElementDTO.getCoreLayoutDTO().getRegisterKey());
        if (LayoutInvoke) {
            let layoutInstance = new LayoutInvoke();
            layoutInstance.applyData(coreLayoutAssignElementDTO.getJsonLayout());
            container.setLayout(layoutInstance);
        } else {
            container.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        }
    }
}
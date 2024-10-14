import WebGridAdvanced from "../../../../../UIFrameWork/HTML/Cells/Grid/Advanced/WebGridAdvanced.js";
import PagingToolbar from "../../../../../UIFrameWork/HTML/Cells/Grid/PagingToolbar/PagingToolbar.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import PagingDTO from "../../../../Communicate/Models/Request/Common/PagingDTO.js";
import RecordDescriptors from "../../Commands/RecordDescriptors.js";
import MyWebAdvancedEditorProvider from "./Grid/MyWebAdvancedEditorProvider.js";
import CustomWebGridAdvancedCellRender from "../../Commands/CustomWebGridAdvancedCellRender.js";
import WebGridAdvancedEditorProvider from "../../../../../UIFrameWork/HTML/Cells/Grid/Advanced/WebGridAdvancedEditorProvider.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import ButtonEditorEvent from "../../../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import {ButtonHeaderAdvancedKeys} from "../../../../../UIFrameWork/HTML/Cells/Grid/Advanced/ButtonHeaderAdvanced.js";
import {WebColumnConfig} from "../../../../../UIFrameWork/HTML/Cells/Grid/Standard/WebColumnConfig.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {SideLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";

export default class GridView extends HTMLContainer {
    constructor() {
        super();

        this.webGridAdvanced = new WebGridAdvanced();
        this.webGridAdvanced.setStripRow(true);
        this.webGridAdvanced.setRecordDescriptorForCell(RecordDescriptors.GridCellDescriptor);
        this.webGridAdvanced.setRecordDescriptorForPk(RecordDescriptors.GridCellPkDescriptor);
        this.webGridAdvanced.setBodyCellChangeDetector(RecordDescriptors.BodyCellChangeDetector);
        this.webGridAdvanced.setWebGridAdvancedCellRender(new CustomWebGridAdvancedCellRender(this.webGridAdvanced));

        this.pagingToolbar = new PagingToolbar();
        this.pagingDTO = new PagingDTO();
        this.pagingDTO.setFromRecord(0);
        this.pagingDTO.setToRecord(20);
        this.pagingDTO.setTotalRecord(100);

        this.sortOrderMap = new Map();
        this.toggleSideContainerMap = new Map();
        this.webGridAdvanced.addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, (buttonEditorEvent) => {
            if (buttonEditorEvent instanceof ButtonEditorEvent) {
                let columnConfigModel = buttonEditorEvent.getExtraAttribute().get(ButtonHeaderAdvancedKeys.DataElement);
                let columnConfig = columnConfigModel.columnConfigModel;
                if (columnConfig instanceof WebColumnConfig) {
                    this.sortOrderMap.set(columnConfig.getEditorModel().getId(), ConvertUtil.ConvertCoreWindowTabFieldSortOrderProfileDTO(buttonEditorEvent.getValue()));
                }
            }
        });

        this.centerLayout = new HTMLContainer();

        this.initNormalLayout();
    }

    addFilterTabContainer(filterTabView, side) {
        let container = this.toggleSideContainerMap.get(side);
        if (container instanceof HTMLComponent) {
            if (container.getAttached()) {
                container.onDetach();
            }
        }

        this.centerLayout.clearItems();
        this.centerLayout.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.centerLayout.addItem(this.webGridAdvanced, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
        this.centerLayout.addItem(this.pagingToolbar, RowLayoutData.factory(1, 32, 0, 0, 0, 0));

        this.clearItems();
        this.setLayout(new SideLayout());
        this.addItem(filterTabView, SideLayoutData.factory(SideLayoutData.Side.Left, 100, true, false, true, true, 0, 0, 0, 0), false);
        this.addItem(this.centerLayout, SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, true, true, 0, 0, 0, 0), false);
    }

    initNormalLayout() {
        this.clearItems();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.addItem(this.webGridAdvanced, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
        this.addItem(this.pagingToolbar, RowLayoutData.factory(1, 32, 0, 0, 0, 0));
    }

    clearColumnConfigs() {
        this.getWebGridAdvanced().getColumnConfigPk().clear();
        this.getWebGridAdvanced().getColumnConfigPkByFieldId().clear();
        this.getWebGridAdvanced().getColumnConfigMap().clear();
        this.getWebGridAdvanced().getColumnConfigByFieldMap().clear();
    }

    addColumnConfig(columnIndex, columnConfig, isPk, id) {
        if (isPk) {
            this.getWebGridAdvanced().getColumnConfigPk().set(columnIndex, columnConfig);
            this.getWebGridAdvanced().getColumnConfigPkByFieldId().set(id, columnConfig);
        } else {
            this.getWebGridAdvanced().getColumnConfigMap().set(columnIndex, columnConfig);
            this.getWebGridAdvanced().getColumnConfigByFieldMap().set(id, columnConfig);
        }
    }

    setActiveGridEditor(active, editorProvider) {
        if (active) {
            if (editorProvider instanceof WebGridAdvancedEditorProvider) {
                this.webGridAdvanced.setWebGridAdvancedEditorProvider(editorProvider);
            } else {
                this.webGridAdvanced.setWebGridAdvancedEditorProvider(new MyWebAdvancedEditorProvider());
            }
        } else {
            this.webGridAdvanced.setWebGridAdvancedEditorProvider(undefined);
        }
    }

    getSortOrderMap() {
        return this.sortOrderMap;
    }

    getWebGridAdvanced() {
        return this.webGridAdvanced;
    }

    bindModelToUI(coreWindowTabDTO) {
        this.pagingToolbar.bindModelToUI(this.pagingDTO);
    }

    getPageToolbar() {
        return this.pagingToolbar;
    }
}

GridView.Side = {
    Left: 'Left',
    Right: 'Right',
    Top: 'Top',
    Bottom: 'Bottom',
}
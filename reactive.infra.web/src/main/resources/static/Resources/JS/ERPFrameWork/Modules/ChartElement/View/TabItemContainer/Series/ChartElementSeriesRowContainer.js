import WebERPSearchEditor from "../../../../FormEngine/WebEditors/WebERPSearchEditor.js";
import {WebComboBox} from "../../../../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {BaseButtonEditor} from "../../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {Util} from "../../../../../../UIFrameWork/Shared/Common/Util.js";
import {WebTextEditor} from "../../../../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import WebColorEditor from "../../../../FormEngine/WebEditors/WebColorEditor.js";
import CoreWindowTabFieldDTO from "../../../../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import ChartElementConfigSeriesRowDTO from "../../../../../Communicate/Models/Response/ChartElement/ChartElementConfigSerieDTO.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ChartElementSeriesRowContainer extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        let add_style = {
            "classButton": "btn_add",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/add-circle.svg"
        };
        let remove_style = {
            "classButton": "btn_remove",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/delete.svg"
        };

        let field_CoreWindowTabFieldDTO = new CoreWindowTabFieldDTO();
        field_CoreWindowTabFieldDTO.setCoreTabId(1);
        field_CoreWindowTabFieldDTO.setId(1);

        this.seriesName = new WebTextEditor();
        this.seriesName.setGeneratePlaceHolderLabel("Name");

        this.xSearchField = new WebERPSearchEditor(WebComboBox.SelectionModeData.SelectedModeSingle, true);
        this.xSearchField.setGeneratePlaceHolderLabel("X Field");
        this.xSearchField.setCoreWindowTabField(field_CoreWindowTabFieldDTO);
        this.xSearchField.addListener(WebERPSearchEditor.EventList.ListViewShowService, (baseEvent) => {
            this.xSearchField.convertPageDTOToUI(this.coreWindowTabFieldPageDataDTOs);
        }, this);

        this.ySearchField = new WebERPSearchEditor(WebComboBox.SelectionModeData.SelectedModeSingle, true);
        this.ySearchField.setGeneratePlaceHolderLabel("Y Field");
        this.ySearchField.setCoreWindowTabField(field_CoreWindowTabFieldDTO);
        this.ySearchField.addListener(WebERPSearchEditor.EventList.ListViewShowService, (baseEvent) => {
            this.ySearchField.convertPageDTOToUI(this.coreWindowTabFieldPageDataDTOs);
        }, this);

        this.colorSeries = new WebColorEditor();
        this.colorSeries.setGeneratePlaceHolderLabel("Color");

        this.addButton = new BaseButtonEditor(Util.ConvertJsonToMap(add_style), null, true);
        this.addButton.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(EventFrameWork.event.Components.ChartElementSeriesRowContainer.ChartElementSeries_Add, new BaseEvent(this));
        });
        this.removeButton = new BaseButtonEditor(Util.ConvertJsonToMap(remove_style), null, true);
        this.removeButton.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(EventFrameWork.event.Components.ChartElementSeriesRowContainer.ChartElementSeries_Remove, new BaseEvent(this));
        });

        this.addItem(this.seriesName, RowLayoutData.factory(0.2, 1, 1, 1, 1, 1, true));
        this.addItem(this.xSearchField, RowLayoutData.factory(0.3, 1, 1, 1, 1, 1, true));
        this.addItem(this.ySearchField, RowLayoutData.factory(0.3, 1, 1, 1, 1, 1, true));
        this.addItem(this.colorSeries, RowLayoutData.factory(0.2, 1, 1, 1, 1, 1, true));
        this.addItem(this.addButton, RowLayoutData.factory(30, 1, 1, 1, 1, 1, true));
        this.addItem(this.removeButton, RowLayoutData.factory(30, 1, 1, 1, 1, 1, true));
    }

    bindModelToUI(coreWindowTabFieldPageDataDTOs) {
        this.coreWindowTabFieldPageDataDTOs = coreWindowTabFieldPageDataDTOs;
    }

    bindUiToModel() {
        let chartElementConfigSeriesRowDTO = new ChartElementConfigSeriesRowDTO();
        chartElementConfigSeriesRowDTO.setUUID(this.getUUID());
        chartElementConfigSeriesRowDTO.setSeriesName(this.seriesName.getValue());
        chartElementConfigSeriesRowDTO.setXField(this.xSearchField.getValue());
        chartElementConfigSeriesRowDTO.setYField(this.ySearchField.getValue());
        chartElementConfigSeriesRowDTO.setDataProviderColorRGBA(this.colorSeries.getValue());
        return chartElementConfigSeriesRowDTO;
    }

    getAddButton() {
        return this.addButton;
    }

    getRemoveButton() {
        return this.removeButton;
    }

    getSeriesName() {
        return this.seriesName;
    }

    getXSearchField() {
        return this.xSearchField;
    }

    getYSearchField() {
        return this.ySearchField;
    }
}
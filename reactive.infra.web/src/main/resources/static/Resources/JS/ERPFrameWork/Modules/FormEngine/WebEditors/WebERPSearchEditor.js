import {WebComboBox} from "../../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {TemplateLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import WebFormEngineFieldSearchData from "../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineFieldSearchData.js";
import DataProviderSearchRequestDTO from "../../../Communicate/Models/Request/Window/Editors/DataProviderSearchRequestDTO.js";
import CoreWindowTabFieldDTO from "../../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import TemplateLayoutData from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import PageDataDTO from "../../../Communicate/Models/Request/Common/PageDataDTO.js";
import PaginationListView from "./Containers/PaginationListView.js";
import FormEngineEventFrameWork from "../Events/FormEngineEventFrameWork.js";
import WebSearchEditorValueGeneratorUI from "./Containers/Search/WebSearchEditorValueGeneratorUI.js";
import BaseEvent from "../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import CoreProcessParamDTO from "../../../Communicate/Models/Response/Process/CoreProcessParamDTO.js";
import {WebEditorDataElement} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {BaseHTMLComponent} from "../../../../UIFrameWork/HTML/Component/BaseHTMLComponent.js";
import ErpWindow from "../../Components/ErpWindow.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {BodyElementWidget} from "../../../../UIFrameWork/HTML/Widget/BodyElementWidget.js";
import {WebERPSearchAdvancedController} from "./Containers/Search/AdvancedSearch/WebERPSearchAdvancedController.js";
import {ConfirmPanelEvent} from "../../Common/Confirm/ConfirmPanel.js";

export default class WebERPSearchEditor extends WebComboBox {

    static registerKey() {
        return "Search";
    };

    constructor(selection, fireEventListActive) {
        super(selection ? selection : WebComboBox.SelectionModeData.SelectedModeSingle);
        this.listView.setLayout(new TemplateLayout('li'));
        this.listView.setActivePagination(true);
        this.listView.addListener(FormEngineEventFrameWork.event.Components.Paging.ChangePage, this.changePage, this);

        this.addListener(EventFrameWork.event.Components.Combobox.ShowPopUp, this.serviceOnShowPopUp, this);
        this.setWebEditorValueGeneratorUI(new WebSearchEditorValueGeneratorUI(this));
        this.fireEventListActive = fireEventListActive;
    }

    onLoad() {
        super.onLoad();
        this.setFilterMode(this.filterMode);
    }

    setValue(value) {
        super.setValue(value);
        this.setRemoveTrigger(!this.isEmptyVariable());
    }

    setRemoveTrigger(remove) {
        this.remove = remove;
        if (this.getAttached()) {
            if (remove) {
                let triggerElementRemove = this.getDataElement().get(WebEditorDataElement.RemoveTrigger);
                if (!triggerElementRemove) {
                    triggerElementRemove = DOM.createElement("div");
                    DOM.addClassName(triggerElementRemove, this.getTriggerRemoveClass());

                    this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, triggerElementRemove, () => {
                        this.setValue(null);
                    }, this);
                    this.addElement(triggerElementRemove, RowLayoutData.factory(32, 1, 0, 0, 0, 0, true));

                    this.setDataElement(WebEditorDataElement.RemoveTrigger, triggerElementRemove);
                }
            } else {
                let triggerElementRemove = this.getDataElement().get(WebEditorDataElement.RemoveTrigger);
                if (triggerElementRemove) {
                    this.removeTrigger(triggerElementRemove);
                    // this.unRegisterEvent(EventFrameWork.event.MouseEvent.click, BaseHTMLComponent.EventType.DOM);

                    this.getDataElement().delete(WebEditorDataElement.RemoveTrigger);
                }
            }
        }
    }

    showAdvancedSearch(isModal, isAdvanced, simpleTextSearch) {
        this.createAdvancedFilter();
        if (isModal) {
            let erpWindow = new ErpWindow(true, true, true, false);
            erpWindow.setTitle("Filter Field");
            erpWindow.setScrollTypeY(null);
            erpWindow.setHideOnOtherClick(false);
            erpWindow.setBaseHeight(400);
            erpWindow.getContent().setLayout(new FitLayout());
            erpWindow.showCenterElement(BodyElementWidget.get(), 800);

            this.webERPSearchAdvancedController.setParentContainer(erpWindow.getContent());
            this.webERPSearchAdvancedController.setAdvanced(isAdvanced);
            this.webERPSearchAdvancedController.getView().getConfirmPanel().addListener(ConfirmPanelEvent.AcceptEvent, () => {
                erpWindow.hide();
            });
            this.webERPSearchAdvancedController.getView().getConfirmPanel().addListener(ConfirmPanelEvent.CancelEvent, () => {
                erpWindow.hide();
            });

            erpWindow.addDragElementMatcherFunction((event) => {
                return !this.webERPSearchAdvancedController.getView().getFilterViewContainer().containElement(event);
            });

        } else {
            this.showPopUpFilter();

            this.webERPSearchAdvancedController.setParentContainer(this.popupFilter);
            this.webERPSearchAdvancedController.setAdvanced(isAdvanced);
            this.webERPSearchAdvancedController.getView().getConfirmPanel().addListener(ConfirmPanelEvent.AcceptEvent, () => {
                this.popupFilter.hide();
            });
            this.webERPSearchAdvancedController.getView().getConfirmPanel().addListener(ConfirmPanelEvent.CancelEvent, () => {
                this.popupFilter.hide();
            });

            // this.popupFilter.addDragElementMatcherFunction((event) => {
            //     return !this.webERPSearchAdvancedController.getView().getFilterViewContainer().getElement().contains(event.target);
            // });
        }
    }

    createAdvancedFilter() {
        if (!this.webERPSearchAdvancedController)
            this.webERPSearchAdvancedController = new WebERPSearchAdvancedController();
        this.webERPSearchAdvancedController.setCoreWindowTabFieldDTO(this.getCoreWindowTabField());
        this.webERPSearchAdvancedController.bindModelToUI();
    }

    setFilterMode(filterMode) {
        super.setFilterMode(filterMode);
        if (this.getAttached()) {
            if (filterMode) {
                let filterTriggerEl = DOM.createElement('div');
                DOM.addClassName(filterTriggerEl, this.getTriggerFilterClass());

                this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, filterTriggerEl, () => {
                    this.showAdvancedSearch(true, true, null);
                }, this);
                this.addElement(filterTriggerEl, RowLayoutData.factory(32, 1, 0, 0, 0, 0, true));

                this.setDataElement(WebEditorDataElement.FilterTrigger, filterTriggerEl);
            } else {
                let filterTriggerEl = this.getDataElement().get(WebEditorDataElement.FilterTrigger);
                if (filterTriggerEl) {
                    filterTriggerEl.removeFromParent();
                    this.unRegisterEvent(EventFrameWork.event.MouseEvent.click, BaseHTMLComponent.EventType.DOM);
                }
            }
        }
    }

    changePage(event) {
        this.loadItemData();
    }

    createListView() {
        this.listView = new PaginationListView();
    }

    serviceOnShowPopUp() {
        this.listView.clearItems();
        this.loadItemData();
    }

    loadItemData() {
        let field = this.getCoreWindowTabField();
        let coreProcessParamDTO = this.getCoreProcessParamDTO();
        let dataProviderSearchRequestDTO = new DataProviderSearchRequestDTO();
        if (field instanceof CoreWindowTabFieldDTO) {
            dataProviderSearchRequestDTO.setCoreWindowTabId(field.getCoreTabId());
            dataProviderSearchRequestDTO.setCoreWindowTabFieldId(field.getId());
        } else if (coreProcessParamDTO instanceof CoreProcessParamDTO) {
            dataProviderSearchRequestDTO.setCoreWindowTabFieldId(0);
            dataProviderSearchRequestDTO.setCoreProcessParamId(coreProcessParamDTO.getId());
        }

        dataProviderSearchRequestDTO.setPagingDTO(this.listView.getPagingModel());
        dataProviderSearchRequestDTO.setCoreTranslateLanguageDTO(this.getLanguage());

        if (this.fireEventListActive) {
            this.fireEvent(WebERPSearchEditor.EventList.ListViewShowService, new BaseEvent(dataProviderSearchRequestDTO));
        } else {
            new WebFormEngineFieldSearchData(this.popUp).SearchKeyValueReference(dataProviderSearchRequestDTO, (pageDataDTOArray) => {
                this.convertPageDTOToUI(pageDataDTOArray);
            });
        }
    }

    convertPageDTOToUI(pageDataDTOArray) {
        if (pageDataDTOArray) {
            pageDataDTOArray.forEach((pageDataDTO) => {
                if (pageDataDTO instanceof PageDataDTO) {
                    this.listView.addItemData([
                        {
                            Value: pageDataDTO
                        },
                        {
                            Name: 'DisplayName',
                            Data: {
                                id: pageDataDTO.getRecordModelDTO().getPkFieldValues(),
                                Display: pageDataDTO.getRecordModelDTO().getDisplay()
                            }
                        }, {
                            Name: 'ClassName',
                            Data: {
                                Display: this.getItemTagPClass()
                            }
                        }], TemplateLayoutData.factory('<div> <p class="%ClassName%">%DisplayName%</p </div>'));
                }
            });
            this.listView.startCaptureLatestElement();
        }
    }
}

WebERPSearchEditor.EventList = {
    ListViewShowService: 'ListViewShowService'
}
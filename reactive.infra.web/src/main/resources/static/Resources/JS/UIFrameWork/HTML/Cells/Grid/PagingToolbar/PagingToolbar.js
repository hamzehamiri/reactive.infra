import {RowLayout, RowLayout_Mode} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import ButtonFactory from "../../../../../ERPFrameWork/Modules/FormEngine/WebEditors/Factory/ButtonFactory.js";
import {RowLayoutData} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import WebTextPageNumberEditor from "./WebTextPageNumberEditor.js";
import SimpleButton from "../../../../../ERPFrameWork/Modules/FormEngine/Toolbar/StandardButtons/SimpleButton.js";
import PagingDTO from "../../../../../ERPFrameWork/Communicate/Models/Request/Common/PagingDTO.js";
import FormEngineEventFrameWork
    from "../../../../../ERPFrameWork/Modules/FormEngine/Events/FormEngineEventFrameWork.js";
import ButtonEditorEvent from "../../../WebEditor/Common/ButtonEditorEvent.js";
import {
    CoreButtonConstantButton
} from "../../../../../ERPFrameWork/Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export default class PagingToolbar extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        let nextPageButton = ButtonFactory.factory(SimpleButton.clientUiKey(), new Map([
            [ButtonFactory.Attribute.classButton, this.getNextPageClass()],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Grid/PagingToolbar/Horizontal/next-page.svg'],
            [ButtonFactory.Attribute.producerDataCallback, (button) => 'Next'],
            [ButtonFactory.Attribute.clickCallback, (event, data, button) => this.eventButton(event)],
            [ButtonFactory.Attribute.buttonKey, CoreButtonConstantButton().NextPage.description]
        ]));

        let previousPageButton = ButtonFactory.factory(SimpleButton.clientUiKey(), new Map([
            [ButtonFactory.Attribute.classButton, this.getPreviousPageClass()],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Grid/PagingToolbar/Horizontal/previous-page.svg'],
            [ButtonFactory.Attribute.producerDataCallback, (button) => 'Next'],
            [ButtonFactory.Attribute.clickCallback, (event, data, button) => this.eventButton(event)],
            [ButtonFactory.Attribute.buttonKey, CoreButtonConstantButton().BeforePage.description]
        ]));

        let firstPageButton = ButtonFactory.factory(SimpleButton.clientUiKey(), new Map([
            [ButtonFactory.Attribute.classButton, this.getFirstPageClass()],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Grid/PagingToolbar/Horizontal/first-page.svg'],
            [ButtonFactory.Attribute.producerDataCallback, (button) => 'Next'],
            [ButtonFactory.Attribute.clickCallback, (event, data, button) => this.eventButton(event)],
            [ButtonFactory.Attribute.buttonKey, CoreButtonConstantButton().FirstPage.description]
        ]));

        let lastPageButton = ButtonFactory.factory(SimpleButton.clientUiKey(), new Map([
            [ButtonFactory.Attribute.classButton, this.getLastPageClass()],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Grid/PagingToolbar/Horizontal/last-page.svg'],
            [ButtonFactory.Attribute.producerDataCallback, (button) => 'Next'],
            [ButtonFactory.Attribute.clickCallback, (event, data, button) => {
                this.eventButton(event)
            }],
            [ButtonFactory.Attribute.buttonKey, CoreButtonConstantButton().LastPage.description]
        ]));

        this.pageNumber = new WebTextPageNumberEditor();
        this.pageNumber.setGeneratePlaceHolderLabel("Page Number");
        this.allPages = new WebTextPageNumberEditor();
        this.allPages.setGeneratePlaceHolderLabel("Pages");
        this.allPages.setReadOnly(true);
        this.pageSize = new WebTextPageNumberEditor();
        this.pageSize.setGeneratePlaceHolderLabel("Size");

        this.addItem(lastPageButton, RowLayoutData.factory(24, 1, 0, 0, 0, 0));
        this.addItem(nextPageButton, RowLayoutData.factory(24, 1, 0, 0, 0, 0));
        this.addItem(this.pageNumber, RowLayoutData.factory(160, 1, 5, 5, 0, 0));
        this.addItem(this.allPages, RowLayoutData.factory(90, 1, 5, 5, 0, 0));
        this.addItem(this.pageSize, RowLayoutData.factory(90, 1, 5, 5, 0, 0));
        this.addItem(previousPageButton, RowLayoutData.factory(24, 1, 0, 0, 0, 0));
        this.addItem(firstPageButton, RowLayoutData.factory(24, 1, 0, 0, 0, 0));

        this.bindTheme();

        this.pageSizeLong = 20;
    }

    eventButton(buttonEditorEvent) {
        if (buttonEditorEvent instanceof ButtonEditorEvent) {
            this.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, buttonEditorEvent);
        }
    }

    bindTheme() {
        super.bindTheme();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.PagingToolbar[0]));
    }

    bindModelToUI(pagingDTO) {
        this.pagingDTO = pagingDTO;
        if (pagingDTO instanceof PagingDTO) {
            this.pageNumber.setValue(pagingDTO.getPageNumber());
            this.allPages.setValue(pagingDTO.getAllPage());
            this.pageSize.setValue(pagingDTO.getPageSize());
        }
    }

    getFromRecord(pagePlus) {
        return (this.pageNumber.getValue() - 1 + pagePlus) * this.pageSize.getValue();
    }

    bindUiToModel() {
        let fromRecord = this.getFromRecord(0);
        let toRecord = fromRecord + this.pageSize.getValue();
        this.pagingDTO.setFromRecord(fromRecord);
        this.pagingDTO.setToRecord(toRecord);
        return this.pagingDTO;
    }

    nextPage() {
        let pagingDTO = this.pagingDTO;
        if (!pagingDTO) {
            this.pagingDTO = new PagingDTO();
        }
        pagingDTO.setFromRecord(this.getFromRecord(1));
        pagingDTO.setToRecord(pagingDTO.getFromRecord() + this.pageSize.getValue());
        this.pageNumber.setValue(this.pageNumber.getValue() + 1);
    }

    lastPage() {

    }

    beforePage() {
        let pagingDTO = this.pagingDTO;
        if (!pagingDTO) {
            this.pagingDTO = new PagingDTO();
        }
        if (this.pageNumber.getValue() > 1) {
            pagingDTO.setFromRecord(this.getFromRecord(-1));
            pagingDTO.setToRecord(pagingDTO.getFromRecord() + this.pageSize.getValue());
            this.pageNumber.setValue(this.pageNumber.getValue() - 1);
        }
    }

    firstPage() {

    }


    onLoad() {
        super.onLoad();
        this.getElement().setAttribute('class', this.getToolbarClass());
    }

    getToolbarClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarToolbar);
    }

    getLastPageClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarLastPage);
    }

    getNextPageClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarNextPage);
    }

    getFirstPageClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarFirstPage);
    }

    getPreviousPageClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarPreviousPage);
    }
}
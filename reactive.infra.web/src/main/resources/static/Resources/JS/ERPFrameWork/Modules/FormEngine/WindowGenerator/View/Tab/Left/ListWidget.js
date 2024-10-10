import HTMLContainer from "../../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import {ListView} from "../../../../../../../UIFrameWork/HTML/ListView/ListView.js";
import {
    TemplateLayout
} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import TemplateLayoutData
    from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import RecordModelDTO from "../../../../../../Communicate/Models/Response/Window/Tab/RecordModelDTO.js";
import PageDataDTO from "../../../../../../Communicate/Models/Request/Common/PageDataDTO.js";
import {UiFrameWorkComponent} from "../../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {FitLayout} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";

export default class ListWidget extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new FitLayout());

        this.listView = new ListView();
        this.listView.setLayout(new TemplateLayout('li'));

        for (let i = 0; i < 5; i++) {
            let recordModelDTO = new RecordModelDTO();
            recordModelDTO.setDisplay("Widget" + i);
            recordModelDTO.setPkFieldValuesMap(i);

            let pageDataDTO = new PageDataDTO();
            pageDataDTO.setRecordModelDTO(recordModelDTO)
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
                }], TemplateLayoutData.factory('<div> <p class="%ClassName%">%DisplayName%</p </div>'))
        }

        this.addItem(this.listView);
    }

    getItemTagPClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorItemTagP);
    }
}
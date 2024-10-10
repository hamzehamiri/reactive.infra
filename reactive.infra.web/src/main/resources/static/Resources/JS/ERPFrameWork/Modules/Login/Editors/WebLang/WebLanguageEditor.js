import WebLanguageClient from "../../../../Communicate/XMLHttpRequest/Services/Languages/WebLanguageClient.js";
import PaginationListView from "../../../FormEngine/WebEditors/Containers/PaginationListView.js";
import WebERPSearchEditor from "../../../FormEngine/WebEditors/WebERPSearchEditor.js";
import CoreTranslateLanguageDTO from "../../../../Communicate/Models/Response/Translate/CoreTranslateLanguageDTO.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";

export default class WebLanguageEditor extends WebERPSearchEditor {
    constructor() {
        super();
    }

    createListView() {
        this.listView = new PaginationListView();
    }

    serviceOnShowPopUp() {
        this.listView.clearItems();
        this.loadItemData();
    }

    convertValue(coreTranslateLanguageDTO) {
        let keyValueDTO = ConvertUtil.ConvertCoreTranslateLanguageDTOToKeyValueDTO(coreTranslateLanguageDTO);
        return ConvertUtil.ConvertKeyValueDTOToPageDataDTO(keyValueDTO.getId(), keyValueDTO);
    }

    loadItemData() {
        new WebLanguageClient(this).WebLanguages((pageDataDTOArray) => {
            this.convertPageDTOToUI(pageDataDTOArray);
        });
    }

    getValue() {
        let keyValueDTO = super.getValue();
        return keyValueDTO ? ConvertUtil.ConvertGeneral(CoreTranslateLanguageDTO, keyValueDTO.getOriginalData()) : null;
    }
}
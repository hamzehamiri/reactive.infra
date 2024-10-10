import WebERPSearchEditor from "../../../FormEngine/WebEditors/WebERPSearchEditor.js";
import PaginationListView from "../../../FormEngine/WebEditors/Containers/PaginationListView.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";
import CoreThemeDTO from "../../../../Communicate/Models/Response/Translate/CoreThemeDTO.js";
import {Theme_Standard} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme_Standard.js";
import {Theme_Dark} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme_ِDark.js";

export default class WebThemeEditor extends WebERPSearchEditor {

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

    loadItemData() {
        let pageDataDTOArray = [];

        let array = WebThemeEditor.ListTheme();

        pageDataDTOArray.push(this.convertValue(array[0]));
        pageDataDTOArray.push(this.convertValue(array[1]));

        this.convertPageDTOToUI(pageDataDTOArray);
    }

    static ListTheme() {
        let standard_CoreThemeDTO = new CoreThemeDTO();
        standard_CoreThemeDTO.setId(1);
        standard_CoreThemeDTO.setTranslate("Standard");
        standard_CoreThemeDTO.setJsonCss(Theme_Standard);

        let dark_CoreThemeDTO = new CoreThemeDTO();
        dark_CoreThemeDTO.setId(2);
        dark_CoreThemeDTO.setTranslate("Dark");
        dark_CoreThemeDTO.setJsonCss(Theme_Dark);

        return [standard_CoreThemeDTO, dark_CoreThemeDTO];
    }

    static findThemeById(coreThemeDTOId) {
        let find;
        WebThemeEditor.ListTheme().forEach(value => {
            if (value.getId() === coreThemeDTOId)
                find = value;
        });
        return find;
    }

    convertValue(coreThemeDTO) {
        let keyValueDTO = ConvertUtil.ConvertCoreThemeDTOToKeyValueDTO(coreThemeDTO);
        return ConvertUtil.ConvertKeyValueDTOToPageDataDTO(keyValueDTO.getId(), keyValueDTO);
    }

    getValue() {
        let keyValueDTO = super.getValue();
        return keyValueDTO ? ConvertUtil.ConvertGeneral(CoreThemeDTO, keyValueDTO.getOriginalData()) : null;
    }
}
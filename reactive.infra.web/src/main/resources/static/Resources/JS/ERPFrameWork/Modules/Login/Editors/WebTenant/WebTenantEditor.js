import PaginationListView from "../../../FormEngine/WebEditors/Containers/PaginationListView.js";
import WebERPSearchEditor from "../../../FormEngine/WebEditors/WebERPSearchEditor.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";
import CoreUserTenantDTO from "../../../../Communicate/Models/Response/Security/User/CoreUserTenantDTO.js";

export default class WebTenantEditor extends WebERPSearchEditor {
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

    setStoreData(coreUserTenantDTOArray) {
        if (coreUserTenantDTOArray instanceof Array) {
            this.coreUserTenantDTOArray = [];
            coreUserTenantDTOArray.forEach((coreUserTenantDTO) => {
                this.coreUserTenantDTOArray.push(this.convertValue(ConvertUtil.ConvertGeneral(CoreUserTenantDTO, coreUserTenantDTO)));
            });
        }
    }

    convertValue(coreUserTenantDTO) {
        let keyValueDTO = ConvertUtil.ConvertCoreUserTenantDTOToKeyValueDTO(coreUserTenantDTO);
        return ConvertUtil.ConvertKeyValueDTOToPageDataDTO(keyValueDTO.getId(), keyValueDTO);
    }

    loadItemData() {
        if (this.coreUserTenantDTOArray) {
            this.convertPageDTOToUI(this.coreUserTenantDTOArray);
        }
    }

    getValue() {
        let keyValueDTO = super.getValue();
        return keyValueDTO ? ConvertUtil.ConvertGeneral(CoreUserTenantDTO, keyValueDTO.getOriginalData()) : null;
    }
}
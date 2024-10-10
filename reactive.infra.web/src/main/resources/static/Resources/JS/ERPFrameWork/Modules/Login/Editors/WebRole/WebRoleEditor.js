import {WebComboBox} from "../../../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import PaginationListView from "../../../FormEngine/WebEditors/Containers/PaginationListView.js";
import WebERPSearchEditor from "../../../FormEngine/WebEditors/WebERPSearchEditor.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";

export default class WebRoleEditor extends WebERPSearchEditor {
    constructor() {
        super(WebComboBox.SelectionModeData.SelectedModeMulti);
    }

    createListView() {
        this.listView = new PaginationListView();
    }

    serviceOnShowPopUp() {
        this.listView.clearItems();
        this.loadItemData();
    }

    setStoreData(coreRoleDTOArray) {
        if (coreRoleDTOArray instanceof Array) {
            this.coreRoleDTOArray = [];
            coreRoleDTOArray.forEach((coreRoleDTO) => {
                this.coreRoleDTOArray.push(this.convertValue(coreRoleDTO));
            });
        }
    }

    convertValue(coreRoleDTO) {
        let keyValueDTO = ConvertUtil.ConvertCoreRoleDTOToKeyValueDTO(coreRoleDTO);
        return ConvertUtil.ConvertKeyValueDTOToPageDataDTO(keyValueDTO.getId(), keyValueDTO);
    }

    convertValues(coreRoleDTOs) {
        let coreRoleDTOPageDataDTO = [];
        if (coreRoleDTOs instanceof Array) {
            coreRoleDTOs.forEach((coreRoleDTO) => {
                coreRoleDTOPageDataDTO.push(this.convertValue(coreRoleDTO));
            })
        }
        return coreRoleDTOPageDataDTO;
    }

    loadItemData(event) {
        if (this.coreRoleDTOArray) {
            this.convertPageDTOToUI(this.coreRoleDTOArray);
        }
    }

    getValue() {
        let keyValueDTOArray = super.getValue();
        if (keyValueDTOArray instanceof Array) {
            return ConvertUtil.ConvertArrayKeyValueDTOToArrayOriginalDTO(keyValueDTOArray);
        } else {
            return null;
        }
    }
}
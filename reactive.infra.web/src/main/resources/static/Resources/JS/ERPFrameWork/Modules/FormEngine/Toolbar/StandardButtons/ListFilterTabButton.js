import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import TemplateLayoutData from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import BaseDropDownButton from "./Common/BaseDropDownButton.js";

export default class ListFilterTabButton extends BaseDropDownButton {

    static Init() {
        ButtonFactory.register(ListFilterTabButton.clientUiKey(), ListFilterTabButton);
    }

    static clientUiKey() {
        return "ListFilterTabButton";
    };

    static WaterMark() {
        return "Render";
    }

    constructor(CommandCustomConsumer, attributeMap, txtButton, defaultButton) {
        super(CommandCustomConsumer, attributeMap, txtButton, defaultButton);
    }

    WaterMarkInstance() {
        return ListFilterTabButton.WaterMark();
    }

    clientUiKeyInstance() {
        return ListFilterTabButton.clientUiKey();
    }

    bindModelToUi(coreWindowTabFilterDTOMap) {
        if (coreWindowTabFilterDTOMap) {
            for (let [, coreWindowTabFilterDTO] of coreWindowTabFilterDTOMap) {
                let displayText = coreWindowTabFilterDTO.getName();
                this.listView.addItemData([
                    {
                        Value: coreWindowTabFilterDTO
                    },
                    {
                        Name: 'DisplayName',
                        Data: {
                            id: coreWindowTabFilterDTO.getId(),
                            Display: displayText
                        }
                    }, {
                        Name: 'ClassName',
                        Data: {
                            Display: this.getBaseDropDownButtonPopUpItemPTagClass()
                        }
                    }, {
                        Name: 'WaterMark',
                        Data: {
                            Display: ListFilterTabButton.WaterMark()
                        }
                    }
                ], TemplateLayoutData.factory('<span> <img src="/Resources/Themes/Img/Components/AttachmentUI/download.svg"  alt="" style="width: 100%;height: 100%;"/> </span> <div> <p %WaterMark%="true" class="%ClassName%">%DisplayName%</p </div>'))
            }
        }
    }
}
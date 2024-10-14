import ButtonFactory from "../../WebEditors/Factory/ButtonFactory.js";
import WebFormEnginePluggableListServiceClient from "../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEnginePluggableListServiceClient.js";
import TemplateLayoutData from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import CoreWindowTabPluggableAssignTabDTO from "../../../../Communicate/Models/Response/Window/Tab/CoreWindowTabPluggableAssignTabDTO.js";
import BaseDropDownButton from "./Common/BaseDropDownButton.js";

export default class ListPlugButton extends BaseDropDownButton {

    static Init() {
        ButtonFactory.register(ListPlugButton.clientUiKey(), ListPlugButton);
    }

    static clientUiKey() {
        return "ListPlugButton";
    };

    static WaterMark() {
        return "Render";
    }

    constructor(CommandCustomConsumer, attributeMap, txtButton, defaultButton) {
        super(CommandCustomConsumer, attributeMap, txtButton, defaultButton);
    }

    WaterMarkInstance() {
        return ListPlugButton.WaterMark();
    }

    clientUiKeyInstance() {
        return ListPlugButton.clientUiKey();
    }

    requestPlug(coreWindowTabPluggableRequestDTO) {
        this.listView.clearItems();
        let service = new WebFormEnginePluggableListServiceClient();
        service.WindowTabPluggableList(coreWindowTabPluggableRequestDTO, (coreWindowTabPluggableAssignTabDTO) => {
            if (coreWindowTabPluggableAssignTabDTO instanceof CoreWindowTabPluggableAssignTabDTO) {
                let displayText = coreWindowTabPluggableAssignTabDTO.getCoreWindowTabPluggableDTO().getCoreViewModuleDTO().getName();
                this.listView.addItemData([
                    {
                        Value: coreWindowTabPluggableAssignTabDTO
                    },
                    {
                        Name: 'DisplayName',
                        Data: {
                            id: coreWindowTabPluggableAssignTabDTO.getId(),
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
                            Display: ListPlugButton.WaterMark()
                        }
                    }
                ], TemplateLayoutData.factory('<span> <img src="/Resources/Themes/Img/Components/AttachmentUI/download.svg"  alt="" style="width: 100%;height: 100%;"/> </span> <div> <p %WaterMark%="true" class="%ClassName%">%DisplayName%</p </div>'))
            }
        });
    }
}
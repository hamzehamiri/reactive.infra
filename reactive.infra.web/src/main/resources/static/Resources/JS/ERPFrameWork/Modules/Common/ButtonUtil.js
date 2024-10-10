import {Util} from "../../../UIFrameWork/Shared/Common/Util.js";
import ButtonFactory from "../FormEngine/WebEditors/Factory/ButtonFactory.js";
import CommandFactory from "./Factory/CommandFactory.js";
import ButtonEditorEvent from "../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import MultiModeButton from "../FormEngine/Toolbar/StandardButtons/MultiModeButton.js";
import SimpleButton from "../FormEngine/Toolbar/StandardButtons/SimpleButton.js";
import CoreButtonAssignElementDTO from "../../Communicate/Models/Response/Button/CoreButtonAssignElementDTO.js";

export default class ButtonUtil {
    static createButtonAction(coreButtonAssignElementDTOMap, CommandExecuteConsumer, CommandCustomConsumer) {
        if (coreButtonAssignElementDTOMap) {
            for (let [, coreButtonAssignElementDTO] of coreButtonAssignElementDTOMap) {
                let attribute;
                if (coreButtonAssignElementDTO instanceof CoreButtonAssignElementDTO) {
                    attribute = coreButtonAssignElementDTO.getCoreCssDTO() && coreButtonAssignElementDTO.getCoreCssDTO().getJsonAttribute() ? Util.ConvertJsonToMap(coreButtonAssignElementDTO.getCoreCssDTO().getJsonAttribute()) : null;
                }
                ButtonUtil.FactoryButton(coreButtonAssignElementDTO, coreButtonAssignElementDTO.getCoreButtonDTO().getClientUiKey(), attribute, CommandExecuteConsumer, CommandCustomConsumer);
            }
        }
    }

    static FactoryButton(coreButtonAssignElementDTO, clientUiKey, attribute, CommandExecuteConsumer, CommandCustomConsumer) {
        let ButtonInstance = ButtonFactory.factory(clientUiKey, attribute, CommandCustomConsumer);
        if (ButtonInstance) {
            ButtonInstance.setButtonKey(coreButtonAssignElementDTO);
            CommandExecuteConsumer(coreButtonAssignElementDTO.getId(), ButtonInstance);
        }
    }

    static CommandAction(commandClientKey, instanceOfController, buttonEvent) {
        if (commandClientKey) {
            let Command = CommandFactory.factory(commandClientKey);
            if (Command) {
                Command(instanceOfController, buttonEvent);
            }
        }
    }

    static ButtonHandleEvent(buttonEvent, instanceOfController) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            let value = buttonEvent.getValue();
            let key = buttonEvent.getKey();
            if (key instanceof CoreButtonAssignElementDTO) {
                switch (key.getCoreButtonDTO().getClientUiKey()) {
                    case MultiModeButton.clientUiKey():
                    case SimpleButton.clientUiKey():
                        ButtonUtil.CommandAction(key.getCoreButtonDTO().getCommandClientKey(), instanceOfController, buttonEvent);
                        break;
                    default:
                        ButtonUtil.CommandAction(key.getCoreButtonDTO().getCommandClientKey(), instanceOfController, buttonEvent);
                }
            } else if (key) {
                ButtonUtil.CommandAction(key, instanceOfController, buttonEvent);
            }
        }
    }
}
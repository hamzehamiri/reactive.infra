import Toolbar from "../../../../../UIFrameWork/HTML/Toolbar/Toolbar.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import BaseView from "../../../Common/BaseView.js";
import TabUtil from "../../../Common/TabUtil.js";
import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import CoreButtonAssignElementDTO from "../../../../Communicate/Models/Response/Button/CoreButtonAssignElementDTO.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";

export default class WindowAbstractView extends BaseView {
    constructor(windowController) {
        super(windowController);
        let toolbar = new Toolbar(32);

        this.setDataElement(WindowAbstractView.Toolbar, toolbar);
    }

    onLoad() {
        super.onLoad();
        DOM.setAttribute(this.getElement(), "WindowAbstractView", "true");
    }

    setActiveContainer(activeContainer) {

    }

    bindModelToUI(metadata) {
        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.addItem(this.getToolbar(), RowLayoutData.factory(1, 48, 2, 2, 2, 2, true));
        this.addItem(this.getMainContainer(), RowLayoutData.factory(1, 1, 2, 2, 2, 2, true));
    }

    rebindModelToUI(item, translate) {

    }

    generateOfTabContainers(coreWindowDTO, creatorTabFunction) {

    }

    createParentContainerOfTab(coreWindowTabDTO) {

    }

    getMainContainer() {
        return this.getDataElement().get(WindowAbstractView.WindowMainContainer);
    }

    getToolbar() {
        return this.getDataElement().get(WindowAbstractView.Toolbar);
    }

    setToolbarButtonModel(coreWindowTabButtonDTOMap) {
        this.getToolbar().clearItems();
        if (coreWindowTabButtonDTOMap) {
            let sortedSimpleButtonArray = TabUtil.startSortButton(coreWindowTabButtonDTOMap);
            sortedSimpleButtonArray.forEach(toolbarButton => {
                this.getToolbar().addItem(toolbarButton, RowLayoutData.factory(toolbarButton.getRequestWidth() && toolbarButton.getRequestWidth() > 0 ? toolbarButton.getRequestWidth() : 40, 1, 3, 3, 3, 3));
            });
        }
    }

    findToolbarButton_ByCommandClientKey(command_client_key) {
        return this.findByCondition(command_client_key, (simple, key) => simple.getButtonKey() && simple.getButtonKey() instanceof CoreButtonAssignElementDTO && simple.getButtonKey().getCoreButtonDTO() && simple.getButtonKey().getCoreButtonDTO().getCommandClientKey() === key)
    }

    findToolbarButton_ByClientUiKey(client_ui_key) {
        return this.findByCondition(client_ui_key, (simple, key) => simple.getButtonKey() && simple.getButtonKey() instanceof CoreButtonAssignElementDTO && simple.getButtonKey().getCoreButtonDTO() && simple.getButtonKey().getCoreButtonDTO().getClientUiKey() === key);
    }

    findByCondition(key, conditionFunction) {
        let buttonArray = [...this.getToolbar().getItems().entries()].find(simpleButtonArray => {
            if (simpleButtonArray[1] instanceof BaseButtonEditor) {
                if (conditionFunction(simpleButtonArray[1], key)) {
                    return true;
                }
            }
        });
        return buttonArray ? buttonArray[1] : null;
    }
}

WindowAbstractView.WindowMainContainer = "WindowMainContainer";
WindowAbstractView.Toolbar = "Toolbar";
import ItemDataMiniDTO from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/ItemData/ItemDataMiniDTO.js";
import ItemDataDTO from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/ItemData/ItemDataDTO.js";
import CoreWindowProfileDTO from "../../Communicate/Models/Response/Profile/Window/CoreWindowProfileDTO.js";
import TemplateLayoutData from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import AdvancedMenu from "../../../UIFrameWork/HTML/Cells/Tree/AdvancedTree/Menu/AdvancedMenu.js";

export default class MenuFactory {
    static CreateWebEditorMenu(webEditor) {
        let advancedMenu = new AdvancedMenu();
        advancedMenu.addItemData(MenuFactory.createRefreshMenuItem(advancedMenu), TemplateLayoutData.factory('<p class="%ClassTag%" > %Title% </p'));
        webEditor.setContextMenu(advancedMenu);
    }

    static CreateMenuItem(viewPort) {
        viewPort.getERPMenu().getContextMenu().addItemData(MenuFactory.createRefreshMenuItem(viewPort.getERPMenu().getContextMenu()), TemplateLayoutData.factory('<p class="%ClassTag%" > %Title% </p'));
    }

    static createRefreshMenuItem(webAdvancedTreeMenu) {
        let itemMiniTitle = new ItemDataMiniDTO();
        itemMiniTitle.setId(1);
        itemMiniTitle.setName("Title");
        itemMiniTitle.setTranslate("Refresh Class");

        let itemMiniClass = new ItemDataMiniDTO();
        itemMiniClass.setId(2);
        itemMiniClass.setName("ClassTag");
        itemMiniClass.setTranslate(webAdvancedTreeMenu.getMenuItemTextClass());

        let refreshNewItem = new ItemDataDTO();
        refreshNewItem.setBaseModel(new CoreWindowProfileDTO());
        refreshNewItem.setItemDataMiniDTOArray([itemMiniTitle, itemMiniClass]);

        return refreshNewItem;
    }
}
import {TemplateLayout} from "../../../../Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";
import {DOM} from "../../../../../Shared/Common/DOM.js";
import Menu from "../../../../Menu/Menu.js";
import {EventFrameWork} from "../../../../../Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../../Shared/Event/BaseEvent.js";
import ComponentWithBaseEvent from "../../../../Component/ComponentWithBaseEvent.js";
import {ShareLayout} from "../../../../../Shared/Layout/ShareLayout.js";

export default class AdvancedMenu extends Menu {
    constructor() {
        super();

        this.setWidth(300);
        this.setBaseHeight(300);

        let templateLayout = new TemplateLayout('li');
        templateLayout.setClassElement("DivMaster");

        this.setElement(DOM.createElement("ul"));
        this.setScrollTypeY(HTMLComponent.ScrollType.Hidden);
        this.setScrollTypeX(HTMLComponent.ScrollType.Hidden);

        this.setLayout(templateLayout);
        this.addListener(EventFrameWork.event.Components.TemplateLayoutEvents.TemplateLayoutItemClickEvent, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let sourceComponent = baseEvent.getSource();
                if (sourceComponent instanceof ComponentWithBaseEvent) {
                    let itemDataDTO = sourceComponent.getData().get(ShareLayout.ItemData);
                    let baseEvent = new BaseEvent(sourceComponent);
                    baseEvent.setDataKey(AdvancedMenuItem.ItemData, itemDataDTO);
                    this.fireEvent(EventFrameWork.event.Components.MenuEvents.MenuEventsItemSelect, baseEvent);
                }
            }
        }, this);
    }
}

export const AdvancedMenuItem = {
    ItemData: 'ItemData'
}
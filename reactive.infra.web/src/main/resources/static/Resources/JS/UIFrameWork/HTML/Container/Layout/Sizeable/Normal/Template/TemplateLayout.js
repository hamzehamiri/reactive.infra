import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {DOM} from "../../../../../../Shared/Common/DOM.js";
import ComponentWithBaseEvent from "../../../../../Component/ComponentWithBaseEvent.js";
import JsonEventFunctionCallBack from "../../../../../Component/JsonEventFunctionCallBack.js";
import {EventFrameWork} from "../../../../../../Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../../../Shared/Event/BaseEvent.js";
import ItemDataDTO from "./ItemData/ItemDataDTO.js";
import ItemDataMiniDTO from "./ItemData/ItemDataMiniDTO.js";

export class TemplateLayout extends ShareLayout {
    constructor(elementName, elementClassName) {
        super(false);
        this.setElementForItem(elementName);
        this.setClassElement(elementClassName);
    }

    setElementForItem(elementName) {
        this.elementName = elementName;
    }

    setClassElement(elementClassName) {
        this.elementClassName = elementClassName;
    }

    addItemData(data, layoutData) {
        super.addItemData(data);
        let template = layoutData.getTemplate();
        let displayTagData;
        if (data instanceof Array) {
            data.forEach(function (record) {
                if (template && record.Data) {
                    template = template.replace('%' + record.Name + '%', record.Data.Display);
                }
            });
        } else if (data instanceof ItemDataDTO) {
            data.getItemDataMiniDTOArray().forEach((itemDataMini) => {
                if (itemDataMini instanceof ItemDataMiniDTO) {
                    template = template.replace('%' + itemDataMini.getName() + '%', itemDataMini.getTranslate());
                }
            });
        } else {
            if (template && data.Data) {
                template = template.replace('%' + data.Name + '%', data.Data.Display);
            }
        }

        let element = DOM.createElement(this.elementName);
        let item = new ComponentWithBaseEvent(element, [new JsonEventFunctionCallBack('click', (component) => {
            this.getContainer().fireEvent(EventFrameWork.event.Components.TemplateLayoutEvents.TemplateLayoutItemClickEvent, new BaseEvent(component));
        })]);
        if (this.elementClassName) {
            let jsonTheme = {
                [this.elementClassName]: [this.elementClassName, {
                    'border': 'none',
                    'border-radius': '8px',
                    'text-align': 'left',
                    'text-decoration': 'none',
                    'display': 'flex',
                    'transition': '0.5s all',
                    '$hover$': {
                        'background': '#7e6767',
                    }
                }]
            };
            item.addClassByElementNameDynamic(this.elementClassName, jsonTheme);
            DOM.addClassName(element, this.elementClassName, false);
        }
        item.setHtml(template);
        item.setData(ShareLayout.ItemData, data);
        item.setData(TemplateLayout.ItemDataDisplayTag, displayTagData);
        this.getContainer().addItem(item);
    }

    LayoutProcess() {
        super.LayoutProcess();
        if (this.getContainer()) {
            let that = this;
            this.getContainer().getItems().forEach(function (item) {
                item.setParent(that.getContainer());
                item.onAttach();
            });
        }
    }
}

TemplateLayout.ItemDataDisplayTag = 'ItemDataDisplayTag';
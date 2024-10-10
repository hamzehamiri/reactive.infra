import {TemplateLayout} from "../Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import {LayoutContainer} from "../Container/LayoutContainer.js";

export class ListViewItemGenerator {
    static Generate(itemData) {
        if (itemData.LayoutName === 'Template') {
            return this.Generate_Template(itemData.LayoutConfig.template, itemData.Data);
        }
    }

    static Generate_Template(template, data) {
        let item = new LayoutContainer();
        item.setNoElement(true);
        item.setLayout(new TemplateLayout());
        item.addItemData(data);
        return item;
    }
}


ListViewItemGenerator.ItemData2 = {

}

ListViewItemGenerator.ItemData = {
    LayoutName: 'Template',
    LayoutConfig: {
        template: '<div> <p>%F1%</p </div> <div> <p>%F2%</p </div>'
    },
    Data1: [
        {
            Name: 'F1',
            Data: {id: 1, Display: 'Rec11'}
        },
        {
            Name: 'F2',
            Data: {id: 2, Display: 'Rec12'}
        },
        {
            Name: 'F3',
            Data: {id: 3, Display: 'Rec12'}
        }
    ],
    Data2: [
        {
            Name: 'F1',
            Data: {id: 1, Display: 'Rec21'}
        },
        {
            Name: 'F2',
            Data: {id: 2, Display: 'Rec22'}
        },
        {
            Name: 'F3',
            Data: {id: 3, Display: 'Rec23'}
        }
    ] ,
    Data3: [
        {
            Name: 'F1',
            Data: {id: 1, Display: 'Rec31'}
        },
        {
            Name: 'F2',
            Data: {id: 2, Display: 'Rec32'}
        },
        {
            Name: 'F3',
            Data: {id: 3, Display: 'Rec33'}
        }
    ]
};
import GlobalFactoryRegister from "../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {AnchorLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Anchor/AnchorLayoutData.js";
import ResponsiveTableLayoutData from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayoutData.js";

export default class LayoutDataFactory {
    static Init() {
        LayoutDataFactory.layoutDataMap = new Map();
        GlobalFactoryRegister.register("LayoutDataFactory", this);

        LayoutDataFactory.register("row_layout_data", RowLayoutData);
        LayoutDataFactory.register("anchor_layout_data", AnchorLayoutData);
        LayoutDataFactory.register("responsive_table_layout_data", ResponsiveTableLayoutData);
    }

    static factory(keyLayout) {
        return LayoutDataFactory.layoutDataMap.get(keyLayout);
    }

    static register(keyLayoutData, LayoutDataClass) {
        LayoutDataFactory.layoutDataMap.set(keyLayoutData, LayoutDataClass);
    }
}
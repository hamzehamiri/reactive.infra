import GlobalFactoryRegister from "../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import {RowLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {AnchorLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Anchor/AnchorLayout.js";
import ResponsiveTableLayout from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayout.js";

export default class LayoutFactory {
    static Init() {
        LayoutFactory.layoutMap = new Map();
        GlobalFactoryRegister.register("LayoutFactory", this);

        LayoutFactory.register("row_layout" , RowLayout);
        LayoutFactory.register("anchor_layout" , AnchorLayout);
        LayoutFactory.register("responsive_table_layout" , ResponsiveTableLayout);
    }

    static factory(keyLayout) {
        return LayoutFactory.layoutMap.get(keyLayout);
    }

    static register(keyLayout, LayoutClass) {
        LayoutFactory.layoutMap.set(keyLayout, LayoutClass);
    }
}
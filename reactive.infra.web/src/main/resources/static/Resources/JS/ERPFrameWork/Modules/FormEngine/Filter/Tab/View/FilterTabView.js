import BaseView from "../../../../Common/BaseView.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import CoreLayoutAssignElementDTO from "../../../../../Communicate/Models/Response/Layout/CoreLayoutAssignElementDTO.js";
import TabUtil from "../../../../Common/TabUtil.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class FilterTabView extends BaseView {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WebTabFilter[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getWebFilterTabMasterDivClass());
    }

    setEditorsWithLayout(editorMap, coreLayoutAssignElementDTO, editorArraySorted) {
        if (editorMap) {
            this.mapEditor = editorMap;

            if (coreLayoutAssignElementDTO instanceof CoreLayoutAssignElementDTO) {
                TabUtil.layoutProcess(this, coreLayoutAssignElementDTO);
            } else {
                TabUtil.createDefaultLayoutAndLayoutDataFilterTab(this, editorArraySorted);
            }

            TabUtil.renderEditors(this, editorArraySorted);

            if (this.getAttached())
                this.layoutExecute();
        }
    }

    getWebFilterTabMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebTabFilter[1].WebFilterTabMasterDiv)
    }
}
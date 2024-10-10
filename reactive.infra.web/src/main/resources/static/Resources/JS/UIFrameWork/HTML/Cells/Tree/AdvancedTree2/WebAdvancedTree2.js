import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import WebAdvancedTreeSelection from "../AdvancedTree/WebAdvancedTreeSelection.js";

export default class WebAdvancedTree2 extends HTMLComponent {
    constructor() {
        super();

        let treeUlElement = DOM.createElement('ul');
        let masterElement = DOM.createElement("div");
        masterElement.appendChild(treeUlElement);

        this.setDataElement(WebAdvancedTree2.TreeULElement, treeUlElement);
        this.setDataElement(WebAdvancedTree2.TreeDivMaster, masterElement);

        this.setElement(masterElement);
        this.setScrollType(HTMLComponent.ScrollType.Auto);
        this.bindTheme();
        this.addStyleAttribute("padding", "0px");

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.mouseNodeClick.name, this);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebAdvancedTree2[0]));
    }

    initialVariables() {
        super.initialVariables();
        this.setData(WebAdvancedTree2.AllClickNodes, new Map());
        this.setData(WebAdvancedTree2.AllCheckBoxNodes, new Map());
        this.setData(WebAdvancedTree2.RecordByNodeElement, new Map());
        this.selection = new WebAdvancedTreeSelection(this);
    }

    onLoad() {
        super.onLoad();

        this.getTreeULElement().setAttribute('class', this.getTreeNodeGroupUlClass());
        this.getMasterDivElement().setAttribute('class', this.getTreeNodeMasterDivClass());
    }

    getTreeULElement() {
        return this.getDataElement().get(WebAdvancedTree2.TreeULElement);
    }

    getMasterDivElement() {
        return this.getDataElement().get(WebAdvancedTree2.TreeDivMaster);
    }

    getTreeNodeMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeMasterDiv);
    }
}

WebAdvancedTree2.TreeULElement = "TreeULElement";
WebAdvancedTree2.TreeDivMaster = "TreeDivMaster";
WebAdvancedTree2.AllClickNodes = "AllClickNodes";
WebAdvancedTree2.AllCheckBoxNodes = "AllCheckBoxNodes";
WebAdvancedTree2.RecordByNodeElement = "RecordByNodeElement";
WebAdvancedTree2.SelectedRecords = "SelectedRecords";
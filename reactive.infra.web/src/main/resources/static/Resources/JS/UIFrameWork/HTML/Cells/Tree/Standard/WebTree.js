import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {WebGrid} from "../../Grid/Standard/WebGrid.js";
import {WebColumnConfig} from "../../Grid/Standard/WebColumnConfig.js";
import {GridSelectionType} from "../../Grid/Standard/GridModelSelection.js";
import {ColumnHeader} from "../../Grid/Standard/ColumnHeader.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import {DOM} from "../../../../Shared/Common/DOM.js";

export class WebTree extends WebGrid {
    constructor() {
        super();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.StandardTree[0]));

        this.gridModelSelection.setGridSelectionType(GridSelectionType.RowSelected);
    }

    setData(allNodes) {

    }

    setTreeConfig(webTreeConfig) {
        this.webTreeConfig = webTreeConfig;
    }

    generateRows() {
        if (!this.treeNodeMap)
            this.treeNodeMap = new Map();
        if (!this.treeNodeMapParentId)
            this.treeNodeMapParentId = new Map();
        if (!this.treeRootNodeMap)
            this.treeRootNodeMap = new Map();
        this.treeNodeMap.clear();
        if (this.keyColumnConfig && this.webTreeConfig) {
            if (this.keyColumnConfig instanceof WebColumnConfig) {
                let maxDepth = 0;
                for (let index = 0; index < this.records.length; index++) {
                    let rec = this.records[index];
                    let child_id = rec[this.keyColumnConfig.getKeyForModelCell()];
                    let parent_id = rec[this.webTreeConfig.getParentColumnConfig().getKeyForModelCell()];

                    let recFullPath = {rec: rec, currentLevel: 0, depthToLeaf: 0, childNodeMap: new Map()};
                    this.treeNodeMap.set(child_id, recFullPath);
                    this.treeNodeMapParentId.set(parent_id, child_id);

                    let depth = this.traverseToRoot(recFullPath, child_id, parent_id, 0);
                    maxDepth = Math.max(maxDepth, depth);
                    recFullPath.depthToLeaf = depth;
                }
                this.maxDepth = maxDepth;
            }
            console.log("Max Depth : " + this.maxDepth);
            // let data = [...this.treeNodeMap.entries()].sort((a, b) => {
            //     return 1;
            // })

            this.generateTreeNodes(this.treeRootNodeMap);
        }
    }

    generateTreeNodes(mapNodes) {
        if (mapNodes != null)
            for (let [key, value] of mapNodes) {
                this.generateNode(value);
                this.generateTreeNodes(value.childNodeMap);
            }
    }

    generateNode(value) {
        let recordTreeNode = value.rec;
        let level = value.currentLevel;
        let cell = recordTreeNode[this.keyColumnConfig.getKeyForModelCell()];
        let tr = DOM.createElement('tr');

        for (let i = 0; i < level; i++) {
            let tdEmpty = DOM.createElement('td');
            tdEmpty.setAttribute("class", this.getTDClass_EMPTY());
            tdEmpty.innerHTML = '&nbsp;';
            tr.appendChild(tdEmpty);
        }

        let td_exp_img = DOM.createElement('img');
        td_exp_img.setAttribute("class", this.getTDClass_EXP_IMG());

        let td_exp = DOM.createElement('td');
        td_exp.setAttribute("class", this.getTDClass_EXP());
        td_exp.appendChild(td_exp_img);

        let td = DOM.createElement('td');
        td.setAttribute('class', this.getTDTreeClass() + ' ' + this.getBaseText());
        td.innerHTML = cell;
        td.setAttribute("colspan", this.maxDepth - level + 1 + "");

        tr.appendChild(td_exp);
        tr.appendChild(td);

        for (let colIndex = 0; colIndex < this.columnConfigs.length; colIndex++) {
            let colConfig = this.columnConfigs[colIndex];

            if (!this.isValidColumnConfig(colConfig))
                continue;

            let modelCellValue = this.recordDescriptorForCell(recordTreeNode, colConfig.getKeyForModelCell());
            let cellValue = modelCellValue === undefined ? '' : modelCellValue;
            let styleTD = WebColumnConfig.generateStyleTD(colConfig);

            let td = DOM.createElement('td');
            td.setAttribute('class', this.getTDClass() + ' ' + this.getBaseText());
            td.setAttribute('style', styleTD);
            td.innerHTML = cellValue;

            tr.appendChild(td);

            this.generateTDs(colIndex, td);
        }

        this.tbody.appendChild(tr);
    }

    renderHeader() {
        this.header.setColumnConfigs(this.columnConfigs, (colConfig, th) => {
            if (colConfig.getColumnIndex() === 0) {
                th.setAttribute("colspan", 6);
            }
        });
    }

    traverseToRoot(recFullPath, child_id, parent_id, depthToLeaf) {
        if (parent_id != null) {
            let parentRec_fullpath = this.treeNodeMap.get(parent_id);
            if (parentRec_fullpath != null && parentRec_fullpath.rec != null) {
                parentRec_fullpath.childNodeMap.set(child_id, recFullPath);
                let parentRec = parentRec_fullpath.rec;
                parent_id = parentRec[this.webTreeConfig.getParentColumnConfig().getKeyForModelCell()];
                child_id = parentRec[this.keyColumnConfig.getKeyForModelCell()];

                return this.traverseToRoot(parentRec_fullpath, child_id, parent_id, ++depthToLeaf);
            } else {
                recFullPath.depthToLeaf = depthToLeaf;
                this.treeRootNodeMap.set(child_id, recFullPath);
                return depthToLeaf;
            }
        } else {
            recFullPath.depthToLeaf = depthToLeaf;
            parent_id = this.treeNodeMapParentId.get(child_id);
            this.treeRootNodeMap.set(child_id, recFullPath);
            return this.traverseToLeaf(recFullPath, parent_id, child_id, depthToLeaf);
        }
    }

    traverseToLeaf(recFullPath, child_id, parent_id, depthToLeaf) {
        if (child_id != null) {
            recFullPath = this.treeNodeMap.get(child_id);

            let parentRec_fullpath = this.treeNodeMap.get(parent_id);
            parentRec_fullpath.childNodeMap.set(child_id, recFullPath);
            parentRec_fullpath.depthToLeaf = depthToLeaf;
            parentRec_fullpath.currentLevel = depthToLeaf;

            this.treeRootNodeMap.delete(child_id);

            parent_id = this.treeNodeMapParentId.get(child_id);

            return this.traverseToLeaf(recFullPath, parent_id, child_id, ++depthToLeaf);
        } else {
            recFullPath.depthToLeaf = depthToLeaf;
            recFullPath.currentLevel = depthToLeaf;
            return depthToLeaf;
        }
    }

    isValidColumnConfig(columnConfig) {
        return !(this.keyColumnConfig.getKeyForModelCell() === columnConfig.getKeyForModelCell() || this.webTreeConfig.getParentColumnConfig().getKeyForModelCell() === columnConfig.getKeyForModelCell());
    }

    getSelectClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].Select);
    }

    getHoverClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].Hover);
    }

    getTableClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].Table);
    }

    getHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].Header);
    }

    getStripClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].Strip);
    }

    getTDClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].TD);
    }

    getTDTreeClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].TDTree);
    }

    getTDClass_EXP() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].TD_EXP);
    }

    getTDClass_EMPTY() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].TD_EMPTY);
    }

    getTDClass_EXP_IMG() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].TD_EXP_IMG);
    }

    getTRClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardTree[1].TR);
    }

    getBaseText() {
        return RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.GeneratorStyle.BaseText)[0];
    }
}

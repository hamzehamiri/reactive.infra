import {WebColumnConfig} from "./Cells/Grid/Standard/WebColumnConfig.js";
import {WebGrid} from "./Cells/Grid/Standard/WebGrid.js";
import {WebTree} from "./Cells/Tree/Standard/WebTree.js";
import {WebTreeConfig} from "./Cells/Tree/Standard/WebTreeConfig.js";
import {DateConverter} from "../Shared/Common/Date/DateConverter.js";
import WebGridAdvanced from "./Cells/Grid/Advanced/WebGridAdvanced.js";

export class DefaultConfigData {
    constructor() {

    }

    static FillTreeDataConfig(tree) {
        if (tree instanceof WebTree) {
            let treeColumnConfig = this.ColumnConfig();
            tree.setColumnConfigs(treeColumnConfig);
            tree.setKeyColumnConfig(treeColumnConfig[6]);
            tree.setDataBindUI(this.GridData(), false);
            tree.setTreeConfig(this.TreeConfig(treeColumnConfig));
        }
    }

    static FillGridDataConfig(webGrid) {
        if (webGrid instanceof WebGrid) {
            webGrid.setColumnConfigs(this.ColumnConfig());
            webGrid.setDataBindUI(this.GridData(), false);
        } else if (webGrid instanceof WebGridAdvanced) {
            let descriptor = (record) => {
                return record.pk;
            };
            webGrid.addColumnConfigs(this.ColumnConfig());
            webGrid.addRecords(this.GridData(), descriptor);
        }
    }

    static TreeConfig(treeColumnConfig) {
        let webTreeConfig = new WebTreeConfig();
        webTreeConfig.setMainColumnConfig(treeColumnConfig[6]);
        webTreeConfig.setParentColumnConfig(treeColumnConfig[5]);

        return webTreeConfig;
    }

    static ColumnConfig() {
        let columnConfig_c1 = new WebColumnConfig();
        columnConfig_c1.setKeyForModelCell('c1_key');
        columnConfig_c1.setDisplay('نام');
        columnConfig_c1.setFixWidth(100);
        columnConfig_c1.setColumnIndex(0);

        let columnConfig_c2 = new WebColumnConfig();
        columnConfig_c2.setKeyForModelCell('c2_key');
        columnConfig_c2.setDisplay('نام خانوادگی');
        columnConfig_c2.setFixWidth(200);
        columnConfig_c2.setColumnIndex(1);

        let columnConfig_c3 = new WebColumnConfig();
        columnConfig_c3.setKeyForModelCell('c3_key');
        columnConfig_c3.setDisplay('کد ملی');
        columnConfig_c3.setFixWidth(80);
        columnConfig_c3.setColumnIndex(2);
        columnConfig_c3.setDescriptorCell((record, key) => {
            return DateConverter.getDisplayDate()
        });

        let columnConfig_c4 = new WebColumnConfig();
        columnConfig_c4.setKeyForModelCell('c4_key');
        columnConfig_c4.setDisplay('ادرس وب');
        columnConfig_c4.setFixWidth(180);
        columnConfig_c4.setColumnIndex(3);

        let columnConfig_c5 = new WebColumnConfig();
        columnConfig_c5.setKeyForModelCell('c5_key');
        columnConfig_c5.setDisplay('میزان مالی');
        columnConfig_c5.setFixWidth(80);
        columnConfig_c5.setColumnIndex(4);

        let columnConfig_c6 = new WebColumnConfig();
        columnConfig_c6.setKeyForModelCell('parent_key');
        columnConfig_c6.setDisplay('والد');
        columnConfig_c6.setFixWidth(80);
        columnConfig_c6.setColumnIndex(5);

        let columnConfig_c7 = new WebColumnConfig();
        columnConfig_c7.setKeyForModelCell('pk');
        columnConfig_c7.setDisplay('');
        columnConfig_c7.setFixWidth(100);
        columnConfig_c7.setColumnIndex(6);

        let columnConfigs = [];
        columnConfigs.push(columnConfig_c1);
        columnConfigs.push(columnConfig_c2);
        columnConfigs.push(columnConfig_c3);
        columnConfigs.push(columnConfig_c4);
        columnConfigs.push(columnConfig_c5);
        columnConfigs.push(columnConfig_c6);
        columnConfigs.push(columnConfig_c7);

        return columnConfigs;
    }

    static RandomRecord() {
        let randomId = Math.round(Math.random() * 100);
        return {
            pk: randomId,
            c1_key: {
                id: randomId,
                display: "Four" + randomId
            },
            c2_key: {id: 11, display: 'ChildeChildeChilde' + randomId},
            c3_key: new Date(),
            c4_key: 'http://localhost' + randomId,
            c5_key: 3434,
            parent_key: randomId
        };
    }

    static GridData() {
        let records = [];
        records.push({
            pk: 4,
            c1_key: {
                id: 4,
                display: "Four"
            },
            c2_key: {id: 11, display: 'ChildeChildeChilde1'},
            c3_key: new Date(),
            c4_key: 'http://localhost',
            c5_key: 3434,
            parent_key: 3
        });
        records.push({
            pk: 3,
            c1_key: {
                id: 3,
                display: "Three"
            },
            c2_key: {id: 11, display: 'ChildeChilde1'},
            c3_key: new Date(),
            c4_key: 'http://localhost',
            c5_key: 3334,
            parent_key: 2
        });
        records.push({
            pk: 2,
            c1_key: {
                id: 2,
                display: "Two"
            },
            c2_key: {id: 11, display: 'Child1'},
            c3_key: new Date(),
            c4_key: 'http://localhost',
            c5_key: 22.13,
            parent_key: 1
        });
        records.push({
            pk: 1,
            c1_key: {
                id: 1,
                display: "One"
            },
            c2_key: {id: 11, display: 'Parent 1'},
            c3_key: new Date(),
            c4_key: 'http://localhost',
            c5_key: 10.13,
            parent_key: null
        });
        return records;
    }
}

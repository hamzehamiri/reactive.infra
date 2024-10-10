export class GridUtil {
    static startSortColumnConfig(columnConfigMap) {
        let sortIndex = [...columnConfigMap.entries()].sort((a, b) => {
            return a[1].getColumnIndex() - b[1].getColumnIndex();
        });

        let index = 1;
        let newColumnConfigSorted = new Map();

        sortIndex.forEach(value => {
            let columnConfig = value[1];
            columnConfig.setSortColumnIndex(index);
            newColumnConfigSorted.set(index, columnConfig);
            index++;
        })
        return newColumnConfigSorted;
    }
}
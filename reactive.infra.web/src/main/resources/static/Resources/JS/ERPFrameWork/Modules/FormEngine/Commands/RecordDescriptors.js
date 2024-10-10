import CoreWindowTabResponseSearchDTO from "../../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import {WebColumnConfig} from "../../../../UIFrameWork/HTML/Cells/Grid/Standard/WebColumnConfig.js";
import DataProviderAbstract from "../../../Communicate/Common/DataProvider/DataProviderAbstract.js";
import DataProviderFactory from "../../../Communicate/Common/DataProvider/DataProviderFactory.js";

export default class RecordDescriptors {

    static Init() {
        RecordDescriptors.renderCellMap = new Map();
    }

    static GridCellDescriptor(record, key) {
        if (record instanceof CoreWindowTabResponseSearchDTO) {
            let editorModel = record.getRecordModelDTO() != null ? record.getRecordModelDTO().getFieldValues().get(key) : null;
            if (editorModel === null || editorModel === undefined)
                return "";
            if (editorModel && ({}).constructor === editorModel.constructor)
                return editorModel.getDisplay();
            else if (editorModel instanceof DataProviderAbstract)
                return editorModel.getDisplay();
            else
                return editorModel;
        } else {
            return "";
        }
    }

    static GridCellPkDescriptor(coreWindowTabResponseSearchDTO, webGrid) {
        let columnConfigPk = webGrid.getColumnConfigPk();
        if (columnConfigPk && coreWindowTabResponseSearchDTO instanceof CoreWindowTabResponseSearchDTO) {
            let pkValue = "";
            if (coreWindowTabResponseSearchDTO.getUuidTarget()) {
                pkValue = coreWindowTabResponseSearchDTO.getUuidTarget();
            } else {
                columnConfigPk.forEach(colPk => {
                    if (colPk instanceof WebColumnConfig) {
                        let fieldId = colPk.getKeyForModelCell();
                        let valPk = coreWindowTabResponseSearchDTO.getRecordModelDTO() != null ? coreWindowTabResponseSearchDTO.getRecordModelDTO().getPkFieldValues().get(fieldId) : null;
                        if (valPk) {
                            pkValue = pkValue + valPk + "_";
                        }
                    }
                });
                pkValue = pkValue.substring(0, pkValue.length - 1);
            }

            return pkValue;
        }
        return "";
    }

    static BodyCellChangeDetector(record, columnConfig) {
        let changeOfValuesField = record.getRecordModelDTO().getFieldValueChanges().get(columnConfig.getKeyForModelCell());
        return changeOfValuesField != null && changeOfValuesField.length > 0;
    }

    static WebEditorMapValue(record) {
        let mapEditorValue = new Map();
        if (record instanceof CoreWindowTabResponseSearchDTO) {
            record.getRecordModelDTO().getFieldValues().forEach((dataProviderAbstractJson, fieldKey) => {
                mapEditorValue.set(fieldKey, RecordDescriptors.WebEditorValueConvert(dataProviderAbstractJson));
            });
        }
        return mapEditorValue;
    }

    static WebEditorValueConvert(dataProviderAbstractJson) {
        let dataProviderAbstract;
        if (dataProviderAbstractJson.constructor.prototype instanceof DataProviderAbstract) {
            return dataProviderAbstractJson;
        } else {
            dataProviderAbstract = new DataProviderAbstract();
            dataProviderAbstract.applyData(dataProviderAbstractJson);
        }
        let DataProviderInvoke = DataProviderFactory.factory(dataProviderAbstract.getCoreTableColumnDataProviderWithSerializer().getCoreTableColumnDataProviderSerializerDTO());
        if (DataProviderInvoke) {
            let dataProviderInvokeInstance = new DataProviderInvoke();
            dataProviderInvokeInstance.applyData(dataProviderAbstractJson);
            return dataProviderInvokeInstance;
        }
        return null;
    }
}
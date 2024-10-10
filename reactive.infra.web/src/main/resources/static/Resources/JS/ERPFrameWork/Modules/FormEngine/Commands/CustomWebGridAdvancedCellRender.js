import WebGridAdvancedCellRender from "../../../../UIFrameWork/HTML/Cells/Grid/Advanced/TableHtmlRender/WebGridAdvancedCellRender.js";
import CoreWindowTabResponseSearchDTO from "../../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import {WebColumnConfig} from "../../../../UIFrameWork/HTML/Cells/Grid/Standard/WebColumnConfig.js";
import CoreWindowTabFieldDTO from "../../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import TabUtil from "../../Common/TabUtil.js";
import WebEditorValueSerializer from "../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";

export default class CustomWebGridAdvancedCellRender extends WebGridAdvancedCellRender {
    constructor(webGridAdvanced) {
        super(webGridAdvanced);
    }

    renderHtmlGridCell(colIndex, colConfig, record, tr, trModel) {
        if (record instanceof CoreWindowTabResponseSearchDTO && colConfig instanceof WebColumnConfig) {
            let coreWindowTabFieldDTO = colConfig.getEditorModel();
            if (coreWindowTabFieldDTO instanceof CoreWindowTabFieldDTO) {
                let webEditorValueSerializer = this.fieldSerializerMap.get(coreWindowTabFieldDTO.getId());
                let webEditorValue = record.getRecordModelDTO().getFieldValues().get(colConfig.getKeyForModelCell());
                if (!webEditorValueSerializer) {
                    let coreTableColumnDataProviderDTO = TabUtil.getDataProviderFromField(coreWindowTabFieldDTO);
                    let WebEditorValueSerializerInvoke = TabUtil.createWebEditorValueSerializer(coreTableColumnDataProviderDTO);
                    if (WebEditorValueSerializerInvoke) {
                        webEditorValueSerializer = new WebEditorValueSerializerInvoke();
                        if (webEditorValueSerializer instanceof WebEditorValueSerializer) {
                            this.fieldSerializerMap.set(coreWindowTabFieldDTO.getId(), webEditorValueSerializer);
                            return webEditorValueSerializer.convertRawToCellRender(webEditorValue, coreWindowTabFieldDTO, this.webGridAdvanced, record, colConfig.getKeyForModelCell());
                        }
                    }
                } else {
                    return webEditorValueSerializer.convertRawToCellRender(webEditorValue, coreWindowTabFieldDTO, this.webGridAdvanced, record, colConfig.getKeyForModelCell());
                }
            }
        }
    }
}
import {DOM} from "../../../../Shared/Common/DOM.js";
import {Util} from "../../../../Shared/Common/Util.js";

export default class WebEditorValueSerializer {

    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        this.coreTableColumnDataProviderWithSerializerDTO = coreTableColumnDataProviderWithSerializerDTO;
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        return webEditorValue;
    }

    convertRawToCellRender(webEditorValue, coreWindowTabFieldDTO, webAdvancedGrid, record, keyForModelCell) {
        let modelCellValue = webAdvancedGrid.recordDescriptorForCell(record, keyForModelCell);
        let p = DOM.createElement('p');
        p.innerHTML = Util.isEmptyString(modelCellValue) ? '&nbsp' : modelCellValue;
        DOM.addClassName(p, webAdvancedGrid.getStandardGridTDPLabelBodyClass());
        return {
            Render: p,
            Value: modelCellValue
        };
    }

    serializeModelToDisplay(webEditorValue, coreWindowTabFieldDTO) {
        return webEditorValue;
    }
}
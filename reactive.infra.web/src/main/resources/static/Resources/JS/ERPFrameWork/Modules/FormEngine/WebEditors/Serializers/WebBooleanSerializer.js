import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import EditorBoolean from "../../../../Communicate/Common/DataProvider/Impl/EditorBoolean.js";
import WebCheckBoxValueGeneratorUI from "../Containers/CheckBox/WebCheckBoxValueGeneratorUI.js";
import DataProviderAbstract from "../../../../Communicate/Common/DataProvider/DataProviderAbstract.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import WebGridAdvanced from "../../../../../UIFrameWork/HTML/Cells/Grid/Advanced/WebGridAdvanced.js";

export default class WebBooleanSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        if (webEditorValue instanceof EditorBoolean) {
            return webEditorValue;
        } else {
            let modelData = new EditorBoolean();
            modelData.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
            modelData.setDisplay(webEditorValue);
            modelData.setKey(webEditorValue);
            return webEditorValue;
        }
    }

    serializeModelToDisplay(dataProviderString, coreWindowTabFieldDTO) {
        return dataProviderString ? dataProviderString.display : "";
    }

    convertRawToCellRender(webEditorValue, coreWindowTabFieldDTO, webAdvancedGrid, record, keyForModelCell) {
        let icon = DOM.createElement("img");
        if (webEditorValue instanceof DataProviderAbstract) {
            let keyValue = webEditorValue.getKey();
            WebCheckBoxValueGeneratorUI.convertData(keyValue, icon);
        } else if (webEditorValue && webEditorValue.constructor === String) {
            WebCheckBoxValueGeneratorUI.convertData(webEditorValue, icon);
        } else {
            WebCheckBoxValueGeneratorUI.convertData(null, icon);
        }
        if (webAdvancedGrid instanceof WebGridAdvanced) {
            // let className = "CheckBoxCellRender";
            // let jsonTheme = {
            //     [className]: [[className], {
            //         'width': '20px',
            //         'transition': '0.5s all',
            //         '$hover$': {
            //             'background': '#7e6767',
            //         }
            //     }]
            // };
            // webAdvancedGrid.addClassByElementNameDynamic(className, jsonTheme);
            DOM.addStyleAttribute(icon, "width", "20px");
            DOM.addStyleAttribute(icon, "vertical-align", "middle");
        }
        return {
            Render: icon,
            Value: "Che"
        };
    }
}
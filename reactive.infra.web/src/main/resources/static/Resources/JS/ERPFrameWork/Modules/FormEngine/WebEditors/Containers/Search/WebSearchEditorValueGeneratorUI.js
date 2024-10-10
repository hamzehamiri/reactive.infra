import WebEditorValueGeneratorUI from "../../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueGeneratorUI.js";
import SearchUI from "./SearchUI.js";
import FlexLayout, {FlexDirection} from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import FlexLayoutData from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import KeyValueDTO from "../../../../../Communicate/Common/DataProvider/Impl/KeyValueDTO.js";
import ListKeyValueDTO from "../../../../../Communicate/Common/DataProvider/Impl/ListKeyValueDTO.js";

export default class WebSearchEditorValueGeneratorUI extends WebEditorValueGeneratorUI {

    constructor(webEditor) {
        super(webEditor);
    }

    generateUi(value) {
        let container = this.webEditor.containerOfItems;
        container.clearItems();
        container.setLayout(new FlexLayout(FlexDirection.row));
        if (value instanceof KeyValueDTO) {
            let item = new SearchUI(value.getDisplay(), value);
            container.addItem(item, FlexLayoutData.factory(0));
        } else if (value instanceof ListKeyValueDTO) {
            let item = new SearchUI(value.getDisplay(), value);
            container.addItem(item, FlexLayoutData.factory(0));
        } else if (value instanceof Array) {
            value.forEach((keyValueDTO) => {
                let item = new SearchUI(keyValueDTO.getDisplay(), keyValueDTO);
                container.addItem(item, FlexLayoutData.factory(0));
            })
        }
    }
}
import WebEditorValueGeneratorUI from "../../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueGeneratorUI.js";
import FlexLayout, {FlexDirection} from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import EditorColorRGBA from "../../../../../Communicate/Common/DataProvider/Impl/EditorColorRGBA.js";
import WebColorEditorBoxColor from "./WebColorEditorBoxColor.js";
import FlexLayoutData from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";

export default class WebColorEditorGeneratorUI extends WebEditorValueGeneratorUI {
    constructor(webEditor) {
        super(webEditor);
    }

    generateUi(value) {
        let container = this.webEditor.containerOfItems;
        container.clearItems();
        container.setLayout(new FlexLayout(FlexDirection.row));
        if (value instanceof EditorColorRGBA) {
            container.addItem(new WebColorEditorBoxColor(value), FlexLayoutData.factory(0));
        }
    }
}
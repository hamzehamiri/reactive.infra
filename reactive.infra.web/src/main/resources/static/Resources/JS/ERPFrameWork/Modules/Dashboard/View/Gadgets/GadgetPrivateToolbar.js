import Toolbar from "../../../../../UIFrameWork/HTML/Toolbar/Toolbar.js";
import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {Util} from "../../../../../UIFrameWork/Shared/Common/Util.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";

export default class GadgetPrivateToolbar extends Toolbar {
    constructor() {
        super();

        let remove_style = {
            "classButton": "btn_remove",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/remove.svg"
        };

        let ok_style = {
            "classButton": "btn_ok",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/ok.svg"
        };

        this.removeBtn = new BaseButtonEditor(Util.ConvertJsonToMap(remove_style), null, true);
        this.acceptBtn = new BaseButtonEditor(Util.ConvertJsonToMap(ok_style), null, true);

        this.addItem(this.removeBtn, RowLayoutData.factory(24, 1, 0, 3, 0, 0));
        this.addItem(this.acceptBtn, RowLayoutData.factory(24, 1, 0, 3, 0, 0));
    }
}
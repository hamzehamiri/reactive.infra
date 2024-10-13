import MultiModeButton from "./StandardButtons/MultiModeButton.js";
import SimpleButton from "./StandardButtons/SimpleButton.js";
import {BaseButtonEditor} from "../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import DropDownButton from "./StandardButtons/DropDownButton.js";
import Divider from "./StandardButtons/Divider.js";
import ListPlugButton from "./StandardButtons/ListPlugButton.js";
import ProcessButton from "./StandardButtons/ProcessButton.js";
import ListFilterTabButton from "./StandardButtons/ListFilterTabButton.js";

export default class StandardButtons {
    static Init() {
        BaseButtonEditor.Init();

        SimpleButton.Init();
        MultiModeButton.Init();
        DropDownButton.Init();
        Divider.Init();
        ListPlugButton.Init();
        ListFilterTabButton.Init();
        ProcessButton.Init();
    }
}
import {WebCheckBoxEditor} from "../WebCheckBoxEditor.js";
import {WebTextEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {WebDateEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Calendar/WebDateEditor.js";
import {WebComboBox} from "../../../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import WebCkeditor from "../../../../../UIFrameWork/HTML/WebEditor/Ckeditor/WebCkeditor.js";
import ToggleButtonEditor from "../../../../../UIFrameWork/HTML/WebEditor/Button/ToggleButtonEditor.js";
import GlobalFactoryRegister from "../../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import WebERPSearchEditor from "../WebERPSearchEditor.js";
import WebAttachmentEditor from "../WebAttachmentEditor.js";
import WebSliderEditor from "../WebSliderEditor.js";
import WebColorEditor from "../WebColorEditor.js";
import WebCronEditor from "../WebCronEditor.js";
import WebPercentEditor from "../WebPercentEditor.js";
import WebPasswordEditor from "../../../../../UIFrameWork/HTML/WebEditor/Password/WebPasswordEditor.js";
import WebPictureEditor from "../WebPictureEditor.js";
import WebNumberEditor from "../WebNumberEditor.js";
import WebSignatureEditor from "../WebSignatureEditor.js";
import WebColor2Editor from "../WebColor2Editor.js";
import WebRangeEditor from "../WebRangeEditor.js";
import WebTreeFlatEditor from "../WebTreeFlatEditor.js";
import WebTreeEditor from "../WebTreeEditor.js";

export default class WebEditorFactory {

    static Init() {
        GlobalFactoryRegister.register("WebEditorFactory", this);
        WebEditorFactory.map = new Map();
        WebEditorFactory.register(WebERPSearchEditor.registerKey(), WebERPSearchEditor);
        WebEditorFactory.register(WebCheckBoxEditor.registerKey(), WebCheckBoxEditor);
        WebEditorFactory.register(WebTextEditor.registerKey(), WebTextEditor);
        WebEditorFactory.register(WebPasswordEditor.registerKey(), WebPasswordEditor);
        WebEditorFactory.register(BaseButtonEditor.clientUiKey(), BaseButtonEditor);
        WebEditorFactory.register(ToggleButtonEditor.registerKey(), ToggleButtonEditor);
        WebEditorFactory.register(WebDateEditor.registerKey(), WebDateEditor);
        WebEditorFactory.register(WebComboBox.registerKey(), WebComboBox);
        WebEditorFactory.register(WebCkeditor.registerKey(), WebCkeditor);
        WebEditorFactory.register(WebAttachmentEditor.registerKey(), WebAttachmentEditor);
        WebEditorFactory.register(WebPictureEditor.registerKey(), WebPictureEditor);
        WebEditorFactory.register(WebSliderEditor.registerKey(), WebSliderEditor);
        WebEditorFactory.register(WebColorEditor.registerKey(), WebColorEditor);
        WebEditorFactory.register(WebColor2Editor.registerKey(), WebColor2Editor);
        WebEditorFactory.register(WebCronEditor.registerKey(), WebCronEditor);
        WebEditorFactory.register(WebPercentEditor.registerKey(), WebPercentEditor);
        WebEditorFactory.register(WebNumberEditor.registerKey(), WebNumberEditor);
        WebEditorFactory.register(WebSignatureEditor.registerKey(), WebSignatureEditor);
        WebEditorFactory.register(WebRangeEditor.registerKey(), WebRangeEditor);
        WebEditorFactory.register(WebTreeFlatEditor.registerKey(), WebTreeFlatEditor);
        WebEditorFactory.register(WebTreeEditor.registerKey(), WebTreeEditor);
    }

    static register(registerKeyEditor, webEditor) {
        WebEditorFactory.map.set(registerKeyEditor, webEditor);
    }

    static factory(registerKeyEditor) {
        return WebEditorFactory.map.get(registerKeyEditor);
    }
}
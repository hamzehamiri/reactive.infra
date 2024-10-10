import {WebEditor} from "../Common/WebEditor.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {HTMLComponent} from "../../Component/HTMLComponent.js";
import ResourceStateModel from "../../../Shared/Common/ResourceStateModel.js";
import ScriptManagerUtil from "../../../Shared/Common/ScriptManagerUtil.js";

export default class WebCkeditor extends WebEditor {
    static registerKey() {
        return "WebCkEditor"
    };

    constructor() {
        super();

        this.editorElement = DOM.createElement('div');

        let contentContainer = DOM.createElement('div');
        contentContainer.appendChild(this.editorElement);
        DOM.addClassName(contentContainer, 'content-container');

        this.toolbarContainer = DOM.createElement('div');
        DOM.addClassName(this.toolbarContainer, 'toolbar-container');

        let documentEditor = DOM.createElement('div');
        documentEditor.appendChild(this.toolbarContainer);
        documentEditor.appendChild(contentContainer);
        DOM.addClassName(documentEditor, "document-editor");

        let main = DOM.createElement('main');
        main.appendChild(documentEditor);

        this.setElement(main);
        this.setScrollType(HTMLComponent.ScrollType.Auto);

        this.addMapByComponent(new ResourceStateModel('./Resources/Library/ckeditor/ckeditor.js', 'Ckeditor', ScriptManagerUtil.Type.JavaScript));

        let that = this;
        this.startCaptureResource((resourceStateModel) => {

        }, () => {
            that.ckJsLoaded = true;
            that.loadCkEditor();
        });
    }

    loadCkEditor() {
        let that = this;
        window.DecoupledEditor.create(this.editorElement)
            .then((ckEditor) => {
                that.ckEditor = ckEditor;
                that.toolbarContainer.prepend(ckEditor.ui.view.toolbar.element);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
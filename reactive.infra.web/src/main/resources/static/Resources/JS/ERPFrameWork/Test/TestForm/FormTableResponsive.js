import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import WebEditorFactory from "../../Modules/FormEngine/WebEditors/Factory/WebEditorFactory.js";
import {WebTextEditor} from "../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import ResponsiveTableLayout from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayout.js";
import ResponsiveTableLayoutData from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayoutData.js";
import ResponsiveTableLayoutDataElement from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveTableLayout/ResponsiveTableLayoutDataElement.js";
import PageType from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Responsive/ResponsiveCommon/PageType.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class FormTableResponsive extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement('div'));
        this.setLayout(new ResponsiveTableLayout());

        let TextField = WebEditorFactory.factory(WebTextEditor.registerKey());

        let t1 = new TextField();
        let t2 = new TextField();
        let t3 = new TextField();
        let t4 = new TextField();
        let t5 = new TextField();
        let t6 = new TextField();

        t1.setGeneratePlaceHolderLabel("Test1");
        t2.setGeneratePlaceHolderLabel("Test2");
        t3.setGeneratePlaceHolderLabel("Test3");
        t4.setGeneratePlaceHolderLabel("Test4");
        t5.setGeneratePlaceHolderLabel("Test5");
        t6.setGeneratePlaceHolderLabel("Test6");

        let smallPageJson = {
            fromWidth: 1,
            toWidth: 1000,
            isMobile: false
        }
        let largePageJson = {
            fromWidth: 1001,
            toWidth: 2000,
            isMobile: false
        }

        let pageSmall = new PageType();
        pageSmall.applyData(smallPageJson);
        let largeSmall = new PageType();
        largeSmall.applyData(largePageJson);

        this.addItem(t1, new ResponsiveTableLayoutData()
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageSmall, 1, 1, 0, 0))
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(largeSmall, 1, 1, 0, 0))
        );

        this.addItem(t2, new ResponsiveTableLayoutData()
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageSmall, 2, 2, 0, 0))
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(largeSmall, 2, 2, 0, 0))
        );

        this.addItem(t3, new ResponsiveTableLayoutData()
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageSmall, 2, 1, 0, 0))
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(largeSmall, 2, 1, 0, 0))
        );

        this.addItem(t4, new ResponsiveTableLayoutData()
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageSmall, 3, 1, 0, 3))
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(largeSmall, 3, 1, 0, 3))
        );

        this.addItem(t5, new ResponsiveTableLayoutData()
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(pageSmall, 1, 2, 0, 0))
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(largeSmall, 1, 2, 0, 0))
        );

        this.addItem(t6, new ResponsiveTableLayoutData()
            .addResponsiveTableLayoutDataElement(new ResponsiveTableLayoutDataElement(largeSmall, 1, 3, 0, 0))
        );
    }
}
import {RowLayout, RowLayout_Mode} from "../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {LayoutContainer} from "../Container/LayoutContainer.js";
import {RowLayoutData} from "../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export class FormButtonBarContainer extends HTMLContainer {
    constructor(formButtonBarContainerAttribute) {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        let buttonBarContainer = new LayoutContainer();
        buttonBarContainer.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
        if (formButtonBarContainerAttribute.Buttons) {
            formButtonBarContainerAttribute.Buttons.forEach((formButton) => {
                if (formButton.Button) {
                    buttonBarContainer.addItem(formButton.Button, RowLayoutData.factory(formButton.Graphic.width,
                        formButton.Graphic.height,
                        formButton.Graphic.margin.left,
                        formButton.Graphic.margin.right,
                        formButton.Graphic.margin.top,
                        formButton.Graphic.margin.bottom));
                }
            })
        }

        switch (formButtonBarContainerAttribute.ButtonBarSide) {
            case "top":
                this.addItem(buttonBarContainer, RowLayoutData.factory(1, formButtonBarContainerAttribute.SizeButtonBar, 0, 0, 0, 0));
                this.addItem(formButtonBarContainerAttribute.CenterContainer, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
                break;
            case "button":
                this.addItem(formButtonBarContainerAttribute.CenterContainer, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
                this.addItem(buttonBarContainer, RowLayoutData.factory(1, formButtonBarContainerAttribute.SizeButtonBar, 0, 0, 0, 0));
                break;
        }
    }
}

export const FormButtonBarContainerAttribute = {
    ButtonBarSide: 'top',
    SizeButtonBar: 100,
    Buttons: [],
    CenterContainer: null
}

export const FormButton = {
    Button: null,
    Graphic: {
        width: 60,
        height: 1,
        margin: {
            left: 1,
            right: 1,
            top: 1,
            bottom: 1
        },
    }
}
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {RowLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {BaseButtonEditor} from "../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {RowLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {HTTPRequestType, XMLHttpRequestListener, XMLHttpRequestRequest} from "../../../ProxyService/XMLHttpRequestService.js";
import CommunicateConstantURL from "../../Communicate/Common/CommunicateConstantURL.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ButtonFormRequest extends HTMLContainer {
    constructor() {
        super();
        this.setElement(DOM.createElement('div'));
        this.setLayout(new RowLayout());

        let button = new BaseButtonEditor();
        button.addListener(EventFrameWork.event.MouseEvent.click, (event) => {
            let requestMenu = new XMLHttpRequestRequest(true);
            requestMenu.request(CommunicateConstantURL.MenuSearchDataURL, HTTPRequestType.POST);
            requestMenu.send(null);
            requestMenu.addListener(XMLHttpRequestListener.onreadystatechange, (event) => {
                console.log("df");
            });
        });

        this.addItem(button, RowLayoutData.factory(100, 100, 0, 0, 0, 0));
        this.addItem(button, RowLayoutData.factory(100, 100, 0, 0, 0, 0));
    }
}
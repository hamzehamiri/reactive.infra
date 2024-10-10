import AccordionFrame from "../../../../../UIFrameWork/HTML/Accordion/AccordionFrame.js";
import AccordionLayout from "../../../../../UIFrameWork/HTML/Accordion/AccordionLayout.js";
import AccordionLayoutData from "../../../../../UIFrameWork/HTML/Accordion/AccordionLayoutData.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import CoreProcessResponseDTO from "../../../../Communicate/Models/Response/Process/CoreProcessResponseDTO.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class ProcessViewSideBar extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new AccordionLayout(AccordionLayout.Mode.AllOpen));

        this.accordionFrameResponse = new AccordionFrame("Response");
        this.accordionFrameHistory = new AccordionFrame("History");

        this.addItem(this.accordionFrameResponse, new AccordionLayoutData());
        this.addItem(this.accordionFrameHistory, new AccordionLayoutData());
    }

    setSize(width, height) {
        super.setSize(width, height);

        DOM.addStyleAttribute(this.accordionFrameHistory.getBodyElement(), 'max-height', (height - 90) + "px");
    }

    addItemHistory(coreProcessResponseDTO) {
        if (coreProcessResponseDTO instanceof CoreProcessResponseDTO) {
            let pTag = DOM.createElement('p');
            pTag.innerText = coreProcessResponseDTO.getBodyResponse() + "Time : " + coreProcessResponseDTO.getDateTime();

            this.accordionFrameHistory.getBodyElement().appendChild(pTag);
            this.accordionFrameHistory.setOpen(true);
        }
    }

    getAccordionFrameResponse() {
        return this.accordionFrameResponse;
    }

    getAccordionFrameHistory() {
        return this.accordionFrameHistory;
    }
}
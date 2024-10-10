import {DOM} from "../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export default class AccordionFrame extends HTMLContainer {
    constructor(title, isOpen) {
        super();
        this.title = title;
        this.isOpen = isOpen;

        let masterElement = DOM.createElement('div');

        let ns = "http://www.w3.org/2000/svg";

        this.pTitleTag = DOM.createElement("p");
        this.pTitleTag.innerHTML = this.title;

        let svgPathIcon = DOM.createElementNS(ns, 'path');
        svgPathIcon.setAttribute("d", "M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z");

        this.svgIcon = DOM.createElementNS(ns, 'svg');
        this.svgIcon.setAttribute('width', "24px");
        this.svgIcon.setAttribute('height', "24px");
        this.svgIcon.setAttribute('viewBox', '0 0 1024 1024');
        this.svgIcon.setAttribute('fill', "#000000");
        this.svgIcon.appendChild(svgPathIcon);

        this.titleElement = DOM.createElement('div');
        this.titleElement.appendChild(this.pTitleTag);
        this.titleElement.appendChild(this.svgIcon);

        this.bodyElement = DOM.createElement('div');

        masterElement.appendChild(this.titleElement);
        masterElement.appendChild(this.bodyElement);

        this.setElement(masterElement);
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Accordion[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.bodyElement, this.getBodyClass());
        DOM.addClassName(this.titleElement, this.getTitleClass());
        DOM.addClassName(this.pTitleTag, this.getAccordionTitlePClass());
        DOM.addClassName(this.getElement(), this.getFrameClass());
        this.setOpen(this.isOpen);
    }

    setOpen(isOpen) {
        if (this.isOpen !== isOpen) {
            this.isOpen = isOpen;
            if (this.isOpen) {
                DOM.removeClassName(this.getElement(), this.getFrameCloseClass());
                DOM.removeClassName(this.titleElement, this.getTitleCloseClass());
                DOM.removeClassName(this.bodyElement, this.getBodyCloseClass());

                DOM.addClassName(this.getElement(), this.getFrameOpenClass());
                DOM.addClassName(this.titleElement, this.getTitleOpenClass());
                DOM.addClassName(this.bodyElement, this.getBodyOpenClass());
                this.svgIcon.setAttribute('class', this.getIconClass());
            } else {
                DOM.removeClassName(this.getElement(), this.getFrameOpenClass());
                DOM.removeClassName(this.titleElement, this.getTitleOpenClass());
                DOM.removeClassName(this.bodyElement, this.getBodyOpenClass());

                DOM.addClassName(this.getElement(), this.getFrameCloseClass());
                DOM.addClassName(this.titleElement, this.getTitleCloseClass());
                DOM.addClassName(this.bodyElement, this.getBodyCloseClass());
                this.svgIcon.setAttribute('class', this.getIconClass() + " " + this.getIconCloseClass());
            }
        }
    }

    getTitleHeader() {
        return this.pTitleTag;
    }

    getBodyElement() {
        return this.bodyElement;
    }

    getFrameClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionFrame);
    }

    getFrameCloseClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionFrameClose);
    }

    getFrameOpenClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionFrameOpen);
    }

    getTitleClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionTitle);
    }

    getAccordionTitlePClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionTitleP);
    }

    getTitleCloseClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionTitleClose);
    }

    getTitleOpenClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionTitleOpen);
    }

    getIconClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionIcon);
    }

    getIconCloseClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionIconClose);
    }

    getBodyClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionBody);
    }

    getBodyCloseClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionBodyClose);
    }

    getBodyOpenClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionBodyOpen);
    }

    getBodyItemClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionBodyItem);
    }

    getBodyItemSelectedClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionBodyItemSelected);
    }
}
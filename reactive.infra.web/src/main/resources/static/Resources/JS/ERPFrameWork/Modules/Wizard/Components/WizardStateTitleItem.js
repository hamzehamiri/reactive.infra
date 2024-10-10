import {HTMLComponent} from "../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import WizardStateTitleEvent from "./Events/WizardStateTitleEvent.js";

export default class WizardStateTitleItem extends HTMLComponent {
    constructor() {
        super();

        let masterDiv = DOM.createElement('div');

        this.setElement(masterDiv);
        this.setFirstState(true);
        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.onClick.name, this);
        this.bindTheme();
    }

    selectItemTitle(selected) {
        this.selected = selected;
        if (this.getAttached()) {
            if (selected) {
                DOM.addClassName(this.getElement(), this.getWizardStateSelectedMasterClass());
            } else {
                DOM.removeClassName(this.getElement(), this.getWizardStateSelectedMasterClass());
            }
        }
    }

    getSelectItemTitle() {
        return this.selected;
    }

    onClick(event) {
        if (this.getElement().contains(event.target)) {
            this.fireEvent(EventFrameWork.event.Components.WizardStateTitleComponent.WizardStateTitleComponentTitleClick, new WizardStateTitleEvent(this));
        }
    }

    setModule(module) {
        this.module = module;
    }

    getModule() {
        return this.module;
    }

    setFirstState(firstState) {
        this.firstState = firstState;
    }

    setState(wizardStateEnum) {
        this.wizardStateEnum = wizardStateEnum;
    }

    setStateCount(stateCount) {
        this.stateCount = stateCount;
    }

    setStateTitle(stateTitle) {
        this.stateTitle = stateTitle;
    }

    onLoad() {
        super.onLoad();

        let nameSpace = "http://www.w3.org/2000/svg";

        let circle = DOM.createElementNS(nameSpace, 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '12');
        circle.setAttribute('r', '12');

        let text = DOM.createElementNS(nameSpace, 'text');
        text.setAttribute('class', this.getWizardStateCounterTextClass());
        text.setAttribute('x', '12');
        text.setAttribute('y', '12');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('text-anchor', 'middle');
        text.innerHTML = this.stateCount;

        let iconSVG = DOM.createElementNS(nameSpace, 'svg');
        iconSVG.setAttribute('class', this.getWizardStateIconSVGClass());
        iconSVG.setAttribute("viewBox", "0 0 24 24");
        iconSVG.appendChild(circle);
        iconSVG.appendChild(text);

        let labelSpan = DOM.createElement('span');
        labelSpan.setAttribute('class', this.getWizardStateLabelTextClass());
        labelSpan.innerText = this.stateTitle;

        let iconContainerSpan = DOM.createElement('span');
        iconContainerSpan.setAttribute('class', this.getWizardStateIconContainerClass());
        iconContainerSpan.appendChild(iconSVG);

        let labelContainerSpan = DOM.createElement('span');
        labelContainerSpan.setAttribute('class', this.getWizardStateLabelContainerClass());
        labelContainerSpan.appendChild(labelSpan);

        let labelContainerMasterSpan = DOM.createElement('span');
        labelContainerMasterSpan.setAttribute('class', this.getWizardStateItemTitleMasterClass());
        labelContainerMasterSpan.appendChild(iconContainerSpan);
        labelContainerMasterSpan.appendChild(labelContainerSpan);

        this.getElement().appendChild(labelContainerMasterSpan);

        DOM.addClassName(this.getElement(), this.getWizardStateMasterClass());

        if (!this.firstState)
            this.addBeforeLine();

        this.selectItemTitle(this.selected);
    }

    addBeforeLine() {
        let lineSpan = DOM.createElement('span');
        DOM.addClassName(lineSpan, this.getWizardStateItemLineSpanClass());

        let lineDiv = DOM.createElement('div');
        lineDiv.appendChild(lineSpan);
        DOM.addClassName(lineDiv, this.getWizardStateItemLineDivClass());

        if (this.getLanguage().getIsRTL()) {
            DOM.addStyleAttribute(lineDiv, 'left', 'calc(+50% + 20px)');
            DOM.addStyleAttribute(lineDiv, 'right', 'calc(-50% + 20px)');
        } else {
            DOM.addStyleAttribute(lineDiv, 'left', 'calc(-50% + 20px)');
            DOM.addStyleAttribute(lineDiv, 'right', 'calc(+50% + 20px)');
        }

        this.getElement().appendChild(lineDiv);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WizardComponentStateTitle[0]));
    }

    getWizardStateMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateMaster);
    }

    getWizardStateSelectedMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateSelectedMaster);
    }

    getWizardStateItemLineDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemLineDiv);
    }

    getWizardStateItemLineSpanClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemLineSpan);
    }

    getWizardStateItemTitleMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemTitleMaster);
    }

    getWizardStateIconContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateIconContainer);
    }

    getWizardStateIconSVGClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateIconSVG);
    }

    getWizardStateLabelContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateLabelContainer);
    }

    getWizardStateCounterTextClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateCounterText);
    }

    getWizardStateLabelTextClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateLabelText);
    }
}
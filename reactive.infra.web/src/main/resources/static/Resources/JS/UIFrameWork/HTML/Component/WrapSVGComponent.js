import {HTMLComponent} from "./HTMLComponent.js";
import {DOM} from "../../Shared/Common/DOM.js";
import DragSVG from "../../SVG/DND/DragSVG.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import DragShareFactoryFunctions from "../../Shared/DND/DragShareFactoryFunctions.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import BaseEvent from "../../Shared/Event/BaseEvent.js";
import {DragShareKeys} from "../../Shared/DND/DragShare.js";

export default class WrapSVGComponent extends HTMLComponent {
    constructor(nameSpace) {
        super();
        this.nameSpace = nameSpace ? nameSpace : 'http://www.w3.org/2000/svg';
        this.svgEl = DOM.createElementNS(nameSpace, 'svg');
        let masterElement = DOM.createElement("div");
        masterElement.appendChild(this.svgEl);
        this.setElement(masterElement);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WrapSVGComponent[0]));
    }

    initialVariables() {
        super.initialVariables();
        this.setViewPortTransform(0, 0);
    }

    setBaseSVGComponent(baseSVGComponent) {
        this.baseSVGComponent = baseSVGComponent;
    }

    setSize(width, height) {
        super.setSize(width, height);
        // DOM.setAttributeNS(this.nameSpace, this.svgEl, 'width', width * 2);
        // DOM.setAttributeNS(this.nameSpace, this.svgEl, 'height', height * 2);
        // DOM.setAttributeNS(this.nameSpace, this.svgEl, 'viewBox', "0 0 " + width * 2 + " " + height * 2);
        // DOM.addStyleAttribute(this.svgEl, 'width', width * 1.3);
        // DOM.addStyleAttribute(this.svgEl, 'height', height * 1.3);
        this.setFinalSVGSize();
    }

    setSVGEl(width, height) {
        this.computeWidth = width;
        this.computeHeight = height;
        this.setFinalSVGSize();
    }

    setFinalSVGSize() {
        let maxWidth = Math.max(this.computeWidth * 2, this.getElement().clientWidth);
        let maxHeight = Math.max(this.computeHeight * 1.3, this.getElement().clientHeight);
        DOM.addStyleAttribute(this.svgEl, 'width', maxWidth);
        DOM.addStyleAttribute(this.svgEl, 'height', maxHeight);
    }

    setViewPortTransform(transformX, transformY) {
        this.transformX = transformX;
        this.transformY = transformY;
        if (this.getAttached()) {
            DOM.addStyleAttribute(this.svgEl, 'transform', `translate(${transformX}px, ${transformY}px)`)
        }
    }

    setScrollViewPort(dx, dy) {
        this.getElement().scrollLeft = this.getElement().scrollLeft - dx;
        this.getElement().scrollTop = this.getElement().scrollTop - dy;
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getWrapSVGComponentMasterClass());
        DOM.addClassName(this.svgEl, this.getWrapSVGComponentSVGClass());

        DOM.setAttributeNS(this.nameSpace, this.svgEl, 'WrapSVGComponent', "True");
        DOM.setAttribute(this.svgEl, 'xmlns', this.nameSpace);

        if (this.baseSVGComponent) {
            this.baseSVGComponent.setParent(this);
            this.baseSVGComponent.setNameSpace(this.nameSpace);
            this.baseSVGComponent.onAttach(this.svgEl);

            this.dragSVG = new DragSVG();
            this.dragSVG.addShiftViewPort(this, this.svgEl);
            this.dragSVG.setBaseSVGComponent(this.baseSVGComponent);
            this.dragSVG.start();
            this.dragSVG.addListener(EventFrameWork.event.DND.DNDStartViewPortPosition, DragShareFactoryFunctions.DNDStartDraggingViewPortSVG((baseSVGComponent, dragEvent) => {
                // this.setViewPortTransform(this.transformX + dragEvent.dX, this.transformY + dragEvent.dY);
                this.setScrollViewPort(dragEvent.dX, dragEvent.dY);
            }));

            this.dragSVG.addListener(EventFrameWork.event.DND.DNDStartDraggingPosition, (event) => {
                if (event instanceof BaseEvent) {
                    let graphTabItemTitleSelectedArray = event.getDataKey().get(DragShareKeys.DragShareKeyObjectSelected);
                    if (graphTabItemTitleSelectedArray) {
                        graphTabItemTitleSelectedArray.forEach((graphTabItemTitle) => {
                            this.baseSVGComponent.StartDNDStartDraggingPosition(graphTabItemTitle);
                        });
                    }
                }
            });
        }
    }

    getWrapSVGComponentMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WrapSVGComponent[1].WrapSVGComponentMaster);
    }

    getWrapSVGComponentSVGClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WrapSVGComponent[1].WrapSVGComponentSVG);
    }
}
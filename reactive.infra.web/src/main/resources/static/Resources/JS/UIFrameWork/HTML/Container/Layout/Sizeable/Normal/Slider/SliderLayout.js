import {FitLayout} from "../Fit/FitLayout.js";
import {DOM} from "../../../../../../Shared/Common/DOM.js";

export default class SliderLayout extends FitLayout {
    constructor() {
        super();
        this.setLayoutPerItem(false);
        this.timeTransition = 1;
        this.withTime = true;
    }

    transitionEnd(component) {
        if (component) {
            console.log("Slider ShareLayout transitionEnd : " + component.getUUID());
            component.layoutExecute();
        }
    }

    setContainer(container) {
        super.setContainer(container);
        if (!this.withTime) {
            container.addStyleAttribute('transition', 'all ' + this.timeTransition + 's ease');
            container.setTransitionLayoutExecute(true, this.transitionEnd);
        }
    }

    ActivePreProcessLayout(item) {
        this.getContainer().getItems().forEach(itemCheck => {
            if (item.getUUID() !== itemCheck.getUUID()) {
                itemCheck.setData("active", false);
            } else {
                itemCheck.setData("active", true);
            }
        });
    }

    LayoutProcess() {
        let size = this.getSizeContainer();
        DOM.setAttribute(this.getContainer().getElement(), "SliderLayout", "true");
        let itemCheckActive;
        this.getContainer().getItems().forEach(itemCheck => {
            if (!itemCheck.getAttached()) {
                // if (itemCheck.getData().get('active')) {
                //     itemCheck.setTransitionLayoutExecute(true);
                // } else {
                //     itemCheck.setTransitionLayoutExecute(false);
                // }

                super.LayoutProcessPerItem(itemCheck);
                // itemCheck.addStyleAttribute('transition', 'all ' + this.timeTransition + 's ease');
                DOM.setAttribute(itemCheck.getElement(), "SliderLayoutData", "true");
            } else {
                if (itemCheck.getData().get('active')) {
                    // itemCheck.setTransitionLayoutExecute(true);
                    itemCheck.setSize(size.widthItem, size.heightItem);
                    itemCheckActive = itemCheck;
                } else {
                    // itemCheck.setTransitionLayoutExecute(false);
                    itemCheck.setSize(size.widthItem, 0);
                }
            }
        });
        if (this.withTime) {
            setTimeout(() => {
                this.transitionEnd(itemCheckActive);
            }, this.timeTransition * 1000);
        }
    }
}
import SliderLayout from "../../Container/Layout/Sizeable/Normal/Slider/SliderLayout.js";
import HTMLContainer from "../../Container/HTMLContainer.js";

export default class TabPanelSlider extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new SliderLayout());
    }

    onLoad() {
        super.onLoad();
        this.setTabItemContainerClass(this.tabItemContainerClass);
    }

    setTabItemContainerClass(tabItemContainerClass) {
        this.tabItemContainerClass = tabItemContainerClass;
        if (this.getAttached()) {
            this.getElement().setAttribute("class", this.tabItemContainerClass);
        }
    }
}
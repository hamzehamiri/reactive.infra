import TabPanelHTML, {TabPanel_Mode} from "../../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import TabItemImageTitle, {TabItemImageTitleMapAttribute} from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItemTitle/TabItemImageTitle.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import {Util} from "../../../../../UIFrameWork/Shared/Common/Util.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ChartElementPropertiesContainer extends HTMLContainer {
    constructor() {
        super();

        let tabItemSeriesConfig = new TabItem();
        tabItemSeriesConfig.setTitle("Series");
        tabItemSeriesConfig.setCloseable(false);
        let tabItemTextConfig = new TabItem();
        tabItemTextConfig.setTitle("Text");
        tabItemTextConfig.setCloseable(false);

        let tabPanel = new TabPanelHTML(TabPanel_Mode.Top);
        tabPanel.setTabItemTitleInvoke(TabItemImageTitle);
        tabPanel.addItem(tabItemSeriesConfig, null, Util.ConvertJsonToMap({
            [TabItemImageTitleMapAttribute.ImgSrc]: './Resources/Themes/Img/Toolbar/Buttons/Tab/Chart/TabIcon/color-adjustement-mode.svg',
            [TabItemImageTitleMapAttribute.Width]: '32px'
        }));
        tabPanel.addItem(tabItemTextConfig, null, Util.ConvertJsonToMap({
            [TabItemImageTitleMapAttribute.ImgSrc]: './Resources/Themes/Img/Toolbar/Buttons/Tab/Chart/TabIcon/pen.svg',
            [TabItemImageTitleMapAttribute.Width]: '32px'
        }));
        tabPanel.setActiveTabItem(tabItemSeriesConfig);

        this.setLayout(new FitLayout());
        this.addItem(tabPanel);
    }
}
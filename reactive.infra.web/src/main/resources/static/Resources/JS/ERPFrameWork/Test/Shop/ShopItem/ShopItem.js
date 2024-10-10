import {HTMLComponent} from "../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import ResourceStateModel from "../../../../UIFrameWork/Shared/Common/ResourceStateModel.js";
import ScriptManagerUtil from "../../../../UIFrameWork/Shared/Common/ScriptManagerUtil.js";
import MaskResourceComponent from "../../../../UIFrameWork/HTML/Component/Masks/MaskResourceComponent.js";

export class ShopItem extends HTMLComponent {
    constructor() {
        super();
        let element = DOM.createElement("div");
        let item = "<article class=\"overflow-hidden d-flex flex-column ai-stretch jc-start h-full\">\n" +
            "        <div class=\"d-flex ai-center jc-start mb-1\">\n" +
            "            <div class=\"ml-1\" style=\"width: 64px; height: 14px;\"><img class=\"w-100 lazyloaded\"\n" +
            "                                                                      " +
            "                                                                      width=\"64\" height=\"14\" style=\"object-fit: cover;\"\n" +
            "                                                                      " +
            "            </div>\n" +
            "            <div class=\"text-body2-extra grow-1\"><br></div>\n" +
            "            <div class=\"d-flex ai-center text-caption mr-auto\"><span class=\"color-500\">Ad</span>\n" +
            "                <div class=\"d-flex mr-1\">\n" +
            "                    <svg style=\"width: 14px; height: 14px; fill: var(--color-ad);\">\n" +
            "                        <use xlink:href=\"#ads\"></use>\n" +
            "                    </svg>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <div class=\"d-flex grow-1 pos-relative flex-column\">\n" +
            "            <div class=\"\">\n" +
            "                <div class=\"d-flex ai-stretch flex-column pos-relative mb-1\">\n" +
            "                    <div class=\"d-flex ai-start mx-auto\">\n" +
            "                        <div>\n" +
            "                            <div style=\"width: 240px; height: 240px;\"><img\n" +
            "                                    class=\"w-100 radius-medium d-inline-block lazyloaded\"\n" +
            "                                    data-src=\"https://dkstatics-public.digikala.com/digikala-products/3a2dec8c8e7e9ee3f2af2eacec77ae246089f035_1646896517.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80\"\n" +
            "                                    width=\"240\" height=\"240\"\n" +
            "                                    alt=\"کوله پشتی لپ تاپ مدل FCLT8433 مناسب برای لپ‌ تاپ 16.4 اینچی\"\n" +
            "                                    style=\"object-fit: contain;\"\n" +
            "                                    src=\"https://dkstatics-public.digikala.com/digikala-products/3a2dec8c8e7e9ee3f2af2eacec77ae246089f035_1646896517.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80\">\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"grow-1 d-flex flex-column ai-stretch jc-start\">\n" +
            "                <div class=\"d-flex ai-center jc-start gap-1 flex-wrap mb-1\">\n" +
            "                    <div class=\"text-caption-strong px-2 d-flex ai-center px-2 undefined ProductBadges_ProductBadges__item__fTPe3 ProductBadges_ProductBadges__fakeBadge__891sf\">\n" +
            "                        <span>غیراصل</span></div>\n" +
            "                    <br><br></div>\n" +
            "                <div><h2 class=\"ellipsis-2 text-body2-strong color-700\">کوله پشتی لپ تاپ مدل FCLT8433 مناسب برای لپ‌ تاپ\n" +
            "                    16.4 اینچی<br><br></h2></div>\n" +
            "                <div class=\"mb-1 d-flex ai-center jc-between\">\n" +
            "                    <div class=\"d-flex ai-center\"><p class=\"text-caption visibility-hidden\">&amp;nbsp;</p><br></div>\n" +
            "                </div>\n" +
            "                <div class=\"pt-1 d-flex flex-column ai-stretch jc-between\">\n" +
            "                    <div class=\"d-flex ai-center jc-between\">\n" +
            "                        <div class=\"px-1 color-white radius-large text-body2-strong d-flex ai-center jc-center ProductPrice_ProductPrice__discountWrapper__bx4mc bg-p-700\">\n" +
            "                            <span>۴۸٪</span></div>\n" +
            "                        <div class=\"d-flex ai-center jc-end gap-1 color-700 color-400 text-h5 grow-1\">\n" +
            "                            <span>۶۱۹,۰۰۰</span>\n" +
            "                            <div class=\"d-flex\">\n" +
            "                                <svg style=\"width: 16px; height: 16px; fill: var(--color-icon-high-emphasis);\">\n" +
            "                                    <use xlink:href=\"#toman\"></use>\n" +
            "                                </svg>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                    <div class=\"d-flex ai-center jc-between pl-5\">\n" +
            "                        <div class=\"color-300 line-through as-end mr-auto text-body-2\">۱,۱۹۹,۰۰۰</div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </article>";
        element.innerHTML = item;
        this.setElement(element);

        // let arrayResourceStateModel = [];
        // arrayResourceStateModel.push(new ResourceStateModel('./Resources/JS/ERPFrameWork/Shop/ShopItem/ShopItem.css', 'Shop Css', ScriptManagerUtil.Type.Css))
        // this.addMapByComponent(arrayResourceStateModel[0]);
        // let that = this;
        // this.startCaptureResource((resourceStateModel) => {
        //     console.log(resourceStateModel.getNameOfComponent())
        // }, () => {
        //     that.unMaskComponent();
        // });
        // this.showMaskComponent(new MaskResourceComponent(arrayResourceStateModel), 100, 300, this.element);
    }

}
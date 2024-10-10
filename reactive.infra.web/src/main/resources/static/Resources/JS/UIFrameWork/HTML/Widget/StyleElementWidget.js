import {DOM} from "../../Shared/Common/DOM.js";
import {BaseHTMLComponent} from "../Component/BaseHTMLComponent.js";
import {UUID} from "../../Shared/Common/UUID.js";

export class StyleElementWidget extends BaseHTMLComponent {
    constructor(ruleStyle) {
        super();
        this.ruleStyle = ruleStyle;
        this.setUUID(UUID.create());
        this.setElement(DOM.createElement('style'));
    }

    initialVariables() {
        super.initialVariables();

        this.setData(StyleElementWidget.MapStyleName, new Map());
        this.setData(StyleElementWidget.MapMediaTags, []);
        this.setData(StyleElementWidget.CssTags, []);
        this.setData(StyleElementWidget.MapKeyFrameTags, new Map());
        this.setData(StyleElementWidget.GeneratedCss, "");
    }

    getMapStyleName() {
        return this.getData().get(StyleElementWidget.MapStyleName);
    }

    getMapMediaTags() {
        return this.getData().get(StyleElementWidget.MapMediaTags);
    }

    getMapKeyFrameTags() {
        return this.getData().get(StyleElementWidget.MapKeyFrameTags);
    }

    getCssTags() {
        return this.getData().get(StyleElementWidget.CssTags);
    }

    getGeneratedCss() {
        return this.getData().get(StyleElementWidget.GeneratedCss);
    }

    setGeneratedCss(generatedCss) {
        this.setData(StyleElementWidget.GeneratedCss, generatedCss);
    }

    onLoad() {
        super.onLoad();
        DOM.setAttribute(this.getElement(), 'type', 'text/css');
    }

    traverse(theme, cssTags, keyFrameMap, tagKeyName, parentClassName) {
        let that = this;
        let styleClassName = parentClassName;
        let isMediaTag = that.isMediaTag(styleClassName);

        let arrayMediaTagsWithJsonFlag = isMediaTag ? {isGenerated: false, arrayMediaTags: []} : null;
        if (tagKeyName != null) {
            let keyFrameArrayWithJsonFlag = {isGenerated: false, keyFrameArray: []};
            keyFrameMap.set(tagKeyName, keyFrameArrayWithJsonFlag);
        }
        for (let themeTag in theme) {
            let nextTag = theme[themeTag];
            if (themeTag === '$hover$') {
                cssTags.push(styleClassName + ":hover");
                that.traverse(nextTag, cssTags, null, null, styleClassName + ":hover");
            } else if (themeTag === '$before$') {
                cssTags.push(styleClassName + "::before");
                that.traverse(nextTag, cssTags, null, null, styleClassName + "::before");
            } else if (themeTag === '$after$') {
                cssTags.push(styleClassName + "::after");
                that.traverse(nextTag, cssTags, null, null, styleClassName + "::after");
            } else if (themeTag === '$first_child$') {
                cssTags.push(styleClassName + ":first-child");
                that.traverse(nextTag, cssTags, null, null, styleClassName + ":first-child");
            } else if (themeTag === '$last_child$') {
                cssTags.push(styleClassName + ":last-child");
                that.traverse(nextTag, cssTags, null, null, styleClassName + ":last-child");
            } else if (themeTag === '$active$') {
                cssTags.push(styleClassName + ":active");
                that.traverse(nextTag, cssTags, null, null, styleClassName + ":active");
            } else if (themeTag === '$webkit-scrollbar$') {
                cssTags.push(styleClassName + "::-webkit-scrollbar");
                that.traverse(nextTag, cssTags, null, null, styleClassName + "::-webkit-scrollbar");
            } else if (themeTag === '$webkit-scrollbar-thumb$') {
                cssTags.push(styleClassName + "::-webkit-scrollbar-thumb");
                that.traverse(nextTag, cssTags, null, null, styleClassName + "::-webkit-scrollbar-thumb");
            } else if (themeTag.indexOf('$font_face$') > -1) {
                cssTags.push(themeTag);
                that.traverse(nextTag, cssTags, null, null, themeTag);
            } else if (themeTag === '$hover:before$') {
                cssTags.push(styleClassName + ":hover::before");
                that.traverse(nextTag, cssTags, null, null, styleClassName + ":hover::before");
            } else if (nextTag instanceof Array) {
                let className = nextTag[0];
                cssTags.push(className);
                nextTag = nextTag[1];
                that.traverse(nextTag, cssTags, null, null, className);
            } else if (nextTag !== null && typeof (nextTag) == "object") {
                if (keyFrameMap instanceof Map) {
                    that.traverse(nextTag, cssTags, keyFrameMap, themeTag);
                } else {
                    let isKeyFrameTag = that.isKeyFrameTag(themeTag);
                    if (isKeyFrameTag) {
                        let keyTag = themeTag.split(" ");
                        let keyFrameMap = new Map();
                        that.getMapKeyFrameTags().set(keyTag[1], keyFrameMap);
                        that.traverse(nextTag, cssTags, keyFrameMap);
                    } else {
                        cssTags.push(themeTag);
                        that.traverse(nextTag, cssTags);
                    }
                }
            } else {
                let cssTag = themeTag + ':' + theme[themeTag] + ';';
                if (tagKeyName != null) {
                    keyFrameMap.get(tagKeyName).keyFrameArray.push(cssTag);
                } else if (isMediaTag) {
                    arrayMediaTagsWithJsonFlag.arrayMediaTags.push(cssTag);
                } else {
                    let arrayCssWithJsonFlag = that.getMapStyleName().get(styleClassName);
                    if (!arrayCssWithJsonFlag) {
                        arrayCssWithJsonFlag = {isGenerated: false, arrayCss: []};
                        that.getMapStyleName().set(styleClassName, arrayCssWithJsonFlag);
                    }
                    arrayCssWithJsonFlag.arrayCss.push(cssTag);
                }
            }
        }
        if (isMediaTag) {
            this.getMapMediaTags().push({mediaTag: styleClassName, Tags: arrayMediaTagsWithJsonFlag});
        }
    }

    setThemeJson(themeJson) {
        this.traverse(themeJson, this.getCssTags());
    }

    setElement(element) {
        this.element = element;
    }

    getElement() {
        return this.element;
    }

    onAttach() {
        super.onAttach();

        this.renderStyle();
    }

    renderStyle() {
        if (this.ruleStyle)
            this.ruleCss();
        else
            this.standardCss();
    }

    onDetach() {
        super.onDetach();
    }

    ruleCss() {
        let that = this;
        this.getMapStyleName().forEach((arrayCssWithJsonFlag, className) => {
            if (arrayCssWithJsonFlag && arrayCssWithJsonFlag.arrayCss && !arrayCssWithJsonFlag.isGenerated) {
                let valueStyle = '';
                for (let cssTag in arrayCssWithJsonFlag.arrayCss) {
                    valueStyle += arrayCssWithJsonFlag.arrayCss[cssTag];
                }
                let sheet = that.getElement().sheet;
                if (sheet && "insertRule" in sheet) {
                    if (className.indexOf('$font_face$') > -1) {
                        sheet.insertRule('@font-face' + '{' + valueStyle + '}');
                    } else {
                        sheet.insertRule('.' + className + '{' + valueStyle + '}');
                    }
                }
                arrayCssWithJsonFlag.isGenerated = true;
            }
        });

        this.getMapMediaTags().forEach(element => {
            let generateCSS = "";
            let sheet = that.getElement().sheet;

            element.Tags.forEach(arrayMediaTagsWithJsonFlag => {
                if (!arrayMediaTagsWithJsonFlag.isGenerated) {
                    generateCSS += arrayMediaTagsWithJsonFlag.arrayMediaTags;
                    arrayMediaTagsWithJsonFlag.isGenerated = true;
                }
            })

            sheet.insertRule(element.mediaTag + '{' + generateCSS + '}');
        });
    }

    standardCss() {
        let generateCSS = this.getGeneratedCss();
        this.getMapStyleName().forEach((arrayCssWithJsonFlag, className) => {
            if (arrayCssWithJsonFlag && arrayCssWithJsonFlag.arrayCss && !arrayCssWithJsonFlag.isGenerated) {
                if (className.indexOf('$font_face$') > -1) {
                    generateCSS += '@font-face {';
                } else {
                    generateCSS += '.' + className + '{';
                }
                for (let cssTag in arrayCssWithJsonFlag.arrayCss) {
                    generateCSS += arrayCssWithJsonFlag.arrayCss[cssTag];
                }
                generateCSS += '}';
                arrayCssWithJsonFlag.isGenerated = true;
            }
        });

        this.getMapMediaTags().forEach(element => {
            generateCSS += element.mediaTag + '{';
            element.Tags.forEach(arrayMediaTagsWithJsonFlag => {
                if (!arrayMediaTagsWithJsonFlag.isGenerated) {
                    generateCSS += arrayMediaTagsWithJsonFlag.arrayMediaTags;
                    arrayMediaTagsWithJsonFlag.isGenerated = true;
                }
            })
            generateCSS += '}';
        });

        this.getMapKeyFrameTags().forEach((value, key) => {
            let generateKeyFrame = '@keyframes ' + key + '{';
            let isValid = false;
            value.forEach((keyFrameArrayWithJsonFlag, key) => {
                if (!keyFrameArrayWithJsonFlag.isGenerated) {
                    generateKeyFrame += key + '{';
                    keyFrameArrayWithJsonFlag.keyFrameArray.forEach((value) => {
                        generateKeyFrame += value;
                    });
                    generateKeyFrame += '}';
                    isValid = true;
                    keyFrameArrayWithJsonFlag.isGenerated = true;
                }
            });
            generateKeyFrame += '}';
            if (isValid) {
                generateCSS += generateKeyFrame;
            }
        });

        this.setGeneratedCss(generateCSS);

        this.getElement().textContent = generateCSS;
    }

    isMediaTag(styleClassName) {
        return styleClassName != null ? styleClassName.indexOf('@') > -1 : false;
    }

    isKeyFrameTag(styleClassName) {
        return styleClassName != null ? styleClassName.indexOf('@') > -1 && styleClassName.indexOf('keyframes') > -1 : false;
    }
}

StyleElementWidget.MapStyleName = "MapStyleName";
StyleElementWidget.MapMediaTags = "MapMediaTags";
StyleElementWidget.MapKeyFrameTags = "MapKeyFrameTags";
StyleElementWidget.CssTags = "CssTags";
StyleElementWidget.GeneratedCss = "GeneratedCss";

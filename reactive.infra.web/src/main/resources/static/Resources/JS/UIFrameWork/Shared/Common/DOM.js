import MyNavigator from "./MyNavigator.js";
import {RegisterComponent} from "../BaseShared/RegisterComponent.js";

export class DOM {
    constructor() {

    }

    static setDirection(element, direction) {
        element.style.direction = direction;
    }

    static addStyleAttribute(element, attribute, value) {
        element.style[attribute] = value;
    }

    static removeStyleAttribute(element, attribute) {
        element.style.removeProperty(attribute);
    }

    static setSize(element, width, height) {
        if (MyNavigator.Instance().isChrome()) {
            element.style.width = width + "px";
            element.style.height = height + "px";
        } else if (MyNavigator.Instance().isFireFox()) {
            element.style.width = width + "px";
            element.style.height = height + "px";
        }
    }

    static setWidth(element, width) {
        element.style.width = width + "px";
    }

    static setWidthPercent(element, width) {
        element.style.width = width + "%";
    }

    static setHeight(element, height) {
        element.style.height = height + "px";
    }

    static setHeightPercent(element, height) {
        element.style.height = height + "%";
    }

    static getBoundingClientRect(element) {
        return element.getBoundingClientRect();
    }

    static getBoundingClientRect_Style(element) {
        let computeStyleMap = this.getComputeStyleMap(element);
        let right = this.getComputeStyleMapValue(computeStyleMap, 'right');
        let left = this.getComputeStyleMapValue(computeStyleMap, 'left');
        let width = this.getComputeStyleMapValue(computeStyleMap, 'width');
        if (right === 'auto') {
            right = left + width;
        }
        if (left === 'auto') {
            left = right - width;
        }
        return {
            left: left,
            right: right,
            width: width,
            height: this.getComputeStyleMapValue(computeStyleMap, 'height'),
            top: this.getComputeStyleMapValue(computeStyleMap, 'top')
        }
    }

    static getComputeStyleMapValue(computeStyleMap, attribName) {
        if (MyNavigator.Instance().isChrome()) {
            return computeStyleMap.get(attribName).value;
        } else if (MyNavigator.Instance().isFireFox()) {
            return Number.parseFloat(computeStyleMap[attribName].replace('px', ''));
        }
    }

    static getComputeStyleMap(element, attribName) {
        if (MyNavigator.Instance().isChrome()) {
            if (attribName) {
                let attributeValue = element.computedStyleMap().get(attribName);
                return attributeValue ? attributeValue.value : null;
            } else {
                return element.computedStyleMap();
            }
        } else if (MyNavigator.Instance().isFireFox()) {
            if (attribName) {
                return Number.parseFloat(window.getComputedStyle(element)[attribName].replace('px', ''));
            } else {
                return window.getComputedStyle(element);
            }
        }
    }

    static setPositionSize(element, x, y, width, height) {
        this.setPosition(element, x, y);
        this.setSize(element, width, height);
    }

    static setPosition(element, x, y, isRtl) {
        if (RegisterComponent.getCurrentLanguage().getIsRTL() && isRtl) {
            element.style.right = x + "px";
        } else {
            element.style.left = x + "px";
        }
        element.style.top = y + "px";
    }

    static setLeft(element, x) {
        element.style.left = x + "px";
    }

    static setFloat(element, float) {
        element.style.float = float;
    }

    static setOffsetLeft(element, x) {
        element.style.offsetLeft = x + "px";
    }

    static setTop(element, y) {
        element.style.top = y + "px";
    }

    static setBlur(element, blurValueWithUnit) {
        element.style.filter = blurValueWithUnit ? 'blur(' + blurValueWithUnit + ')' : null;
    }

    static makePositionable(element, enable) {
        if (enable) {
            element.style.position = 'absolute';
        } else {
            element.style.position = 'relative';
        }
    }

    static setMargin(element, left, right, top, bottom) {
        element.style.marginLeft = left + "px";
        element.style.marginRight = right + "px";
        element.style.marginTop = top + "px";
        element.style.marginBottom = bottom + "px";
    }

    static addClassName(element, className, isFirst) {
        if (element != null && className.length > 0) {
            element.classList.add(className);
            // if (!this.hasClassName(element, className)) {
            //     if (isFirst) {
            //         element.className = ' ' + className + ' ' + element.className;
            //     } else {
            //         element.className += ' ' + className + ' ';
            //     }
            // }
        }
    }

    static addClassNameSVG(element, className) {
        element.setAttribute('class', `${element.getAttribute('class') || ''} ${className}`);
    }

    static removeClassName(element, className) {
        if (element != null) {
            // let classname = element.className.replace(' ' + className + ' ', '');
            // element.className = classname;
            element.classList.remove(className);
        }
    }

    static hasClassName(element, findClassName) {
        // let className = element.className;
        // return className.indexOf(' ' + findClassName + ' ') >= 0;
        return element.classList.contains(findClassName);
    }

    static setClassNames(element, classNames) {
        element.className = classNames;
    }

    static setAttribute(element, attribute, value) {
        element.setAttribute(attribute, value);
    }

    static setAttributeNS(nameSpace, element, attribute, value) {
        element.setAttributeNS(nameSpace, attribute, value);
    }

    static setReadOnlyAttribute(element) {
        element.setAttribute('readonly', true);
    }

    static removeReadOnlyAttribute(element) {
        element.removeAttribute('readonly');
    }

    static setScrollMode(element, scrollMode) {
        element.style.overflow = scrollMode;
    }

    static addEventListener(element, eventName, func) {
        element.addEventListener(eventName, func);
    }

    static removeEventListener(element, eventName, func) {
        element.removeEventListener(eventName, func);
    }

    static removeChildNodes(parent) {
        parent.innerHTML = '';
    }

    static hasChildren(parent, child) {
        return child.parentElement != null && parent.hasChildNodes(child);
    }

    static hasChildrenOld(parent, child) {
        parent.childNodes.forEach(childElement => {
            if (childElement === child) {
                return true;
            }
        });
        return false;
    }

    static getWidth(element) {
        return this.getComputeStyleMap(element, 'width');
    }

    static getFontFamilyWithMap(element, computedStyleMap) {
        return computedStyleMap(element, 'font-family');
    }

    static getFontFamily(element) {
        return window.getComputedStyle(element).fontFamily;
    }

    static getFontSize(element) {
        return window.getComputedStyle(element).fontSize;
    }

    static getOffsetWidth(element) {
        return element.offsetWidth;
    }

    static getCompute_Width(element) {
        return window.getComputedStyle(element).width.replace('px', '');
    }

    static getHeight(element) {
        return this.getComputeStyleMap(element, 'height');
    }

    static getOffsetHeight(element) {
        return element.offsetHeight;
    }

    static getCompute_Height(element) {
        return window.getComputedStyle(element).height.replace('px', '');
    }

    static createElement(tagName) {
        return document.createElement(tagName);
    }

    static createElementNS(nameSpaceUrl, tagName) {
        return document.createElementNS(nameSpaceUrl, tagName);
    }

    static ZIndex(element, zIndex) {
        element.style.zIndex = zIndex;
    }

    static getZIndex(element) {
        return element.style.zIndex;
    }

    static setCursor(element, cursor) {
        element.style.cursor = cursor;
    }
}

export const Cursor = {
    alias: 'alias',
    allscroll: 'all-scroll',
    auto: 'auto',
    cell: 'cell',
    contextmenu: 'context-menu',
    colresize: 'col-resize',
    copy: 'copy',
    crosshair: 'crosshair',
    default: 'default',
    eresize: 'e-resize',
    ewresize: 'ew-resize',
    help: 'help',
    move: 'move',
    nresize: 'n-resize',
    neresize: 'ne-resize',
    neswresize: 'nesw-resize',
    nsresize: 'ns-resize',
    nwresize: 'nw-resize',
    nwseresize: 'nwse-resize',
    nodrop: 'no-drop',
    none: 'none',
    notallowed: 'not-allowed',
    pointer: 'pointer',
    progress: 'progress',
    rowresize: 'row-resize',
    sresize: 's-resize',
    seresize: 'se-resize',
    swresize: 'sw-resize',
    text: 'text',
    URL: 'URL',
    verticaltext: 'vertical-text',
    wresize: 'w-resize',
    wait: 'wait',
    zoomin: 'zoom-in',
    zoomout: 'zoom-out',
    initial: 'initial',
    inherit: 'inherit'
};
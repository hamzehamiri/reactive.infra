import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";

export default class LetterButton extends HTMLComponent {
    constructor() {
        super();

        let nameSpace = "http://www.w3.org/2000/svg";

        let mailElement = DOM.createElementNS(nameSpace, 'path');
        mailElement.setAttribute("d", "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z");

        // let circleElement = DOM.createElementNS(nameSpace, 'circle');
        // circleElement.setAttribute("style", "fill:url(#toning);stroke:#010101;stroke-width:1.6871;stroke-miterlimit:10;");
        // circleElement.setAttribute("cx", "24");
        // circleElement.setAttribute("cy", "0");
        // circleElement.setAttribute("r", "8");

        let textElement = DOM.createElementNS(nameSpace, 'text');
        textElement.setAttribute("style", "font-size:9px;");
        textElement.setAttribute("x", "22");
        textElement.setAttribute("y", "2");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("stroke", "#0235fd");
        textElement.setAttribute("stroke-width", "2");
        textElement.setAttribute("dy", "0.1em");
        textElement.innerHTML = "+999";

        let svgElement = DOM.createElementNS(nameSpace, 'svg');
        svgElement.setAttribute('viewBox', '0 0 32 32');
        svgElement.appendChild(mailElement);
        // svgElement.appendChild(circleElement);
        svgElement.appendChild(textElement);

        this.setElement(svgElement);
    }
}
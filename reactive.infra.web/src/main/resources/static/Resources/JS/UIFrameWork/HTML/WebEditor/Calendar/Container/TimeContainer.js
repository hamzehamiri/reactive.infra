import {RowLayout, RowLayout_Mode} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export class TimeContainer extends HTMLContainer {
    constructor() {
        super();
        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
    }
}
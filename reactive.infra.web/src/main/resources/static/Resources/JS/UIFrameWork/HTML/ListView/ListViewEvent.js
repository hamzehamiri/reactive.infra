import BaseEvent from "../../Shared/Event/BaseEvent.js";
import {ListView} from "./ListView.js";

export default class ListViewEvent extends BaseEvent {
    constructor(listView, source) {
        super(source);
        this.listView = listView;
    }

    getSelectedItems() {
        if (this.listView instanceof ListView) {
            return this.listView.getSelectedItems();
        }
    }
}
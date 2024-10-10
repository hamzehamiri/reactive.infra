import KeyValueDTO from "./KeyValueDTO.js";
import DataProviderAbstract from "../DataProviderAbstract.js";

export default class ListKeyValueDTO extends DataProviderAbstract {
    constructor() {
        super();
    }

    // getValues() {
    //     if (this.values) {
    //         let valuesArray = [];
    //         this.values.forEach((value) => {
    //             let val = new KeyValueDTO();
    //             val.applyData(value);
    //             valuesArray.push(val);
    //         });
    //         return valuesArray;
    //     }
    // }
}
import Print from "./Print.js";

export default class Utils {
    static PrintPDF(blob) {
        let print = new Print();
        print.Printer(blob, 'pdf');
    }

    static MergeData(xArray, yArray) {
        let data = [];
        for (let i = 0; i < xArray.length; i++) {
            data.push([xArray[i], Number.parseFloat(yArray[i])]);
        }
        return data;
    }
}
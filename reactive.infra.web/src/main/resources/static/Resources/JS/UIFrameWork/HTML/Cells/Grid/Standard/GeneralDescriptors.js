import {DateConverter} from "../../../../Shared/Common/Date/DateConverter.js";

export class GeneralDescriptors {
    static General() {
        return (record, key) => {
            let editorModel = record[key];
            if (editorModel instanceof Date) {
                return DateConverter.getDisplayDate(editorModel);
            } else if (editorModel === null || editorModel === undefined)
                return "";
            if (({}).constructor === editorModel.constructor)
                return editorModel.display;
            else
                return editorModel;
        }
    }
}

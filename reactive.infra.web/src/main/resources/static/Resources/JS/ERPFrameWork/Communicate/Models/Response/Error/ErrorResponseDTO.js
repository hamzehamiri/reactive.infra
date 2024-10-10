import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ErrorResponseFieldDTO from "./ErrorResponseFieldDTO.js";

export default class ErrorResponseDTO extends BaseModel {

    constructor() {
        super();
    }

    getErrorStatus() {
        return this.errorStatus;
    }

    getError() {
        return this.error;
    }

    getErrorDescription() {
        return this.errorDescription;
    }

    getErrorTraceId() {
        return this.errorTraceId;
    }

    getErrorOn() {
        return this.errorOn;
    }

    getState() {
        return this.state;
    }

    getErrorAt() {
        return this.errorAt;
    }

    getErrorFields() {
        if (this.errorFields) {
            let errorFieldsDTO = [];
            this.errorFields.forEach((errorField) => {
                let errorFieldDTO = new ErrorResponseFieldDTO();
                errorFieldDTO.applyData(errorField);
                errorFieldsDTO.push(errorFieldDTO);
            })
            return errorFieldsDTO;
        } else {
            return null;
        }
    }

    getErrorData() {
        return this.errorData;
    }
}
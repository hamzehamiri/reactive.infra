import BaseController from "../../../Common/BaseController.js";
import FilterTabView from "./View/FilterTabView.js";

export default class FilterTabController extends BaseController {
    constructor() {
        super();

        let view = new FilterTabView();

        this.setView(view);
    }

    setFunctionFilterProvider(functionFilterProvider) {
        this.functionFilterProvider = functionFilterProvider;
    }

    setFilterMetaData(coreFilterAssignElementMasterDTOArrays) {
        this.coreFilterAssignElementMasterDTOArrays = coreFilterAssignElementMasterDTOArrays;
    }
}


export const FilterTabControllerFunction = {
    ChangeFilterFunction: 'ChangeFilterFunction',
}

export class FilterTabControllerFunctionFactory {
    static Factory(ChangeFilterFunction, AfterCloseButton) {
        let json = {};
        if (ChangeFilterFunction) {
            json[FilterTabControllerFunction.ChangeFilterFunction] = ChangeFilterFunction;
        }
        return json;
    }
}
import BaseController from "../../../Common/BaseController.js";
import FilterTabView from "./View/FilterTabView.js";
import CoreWindowTabFilterDTO from "../../../../Communicate/Models/Response/Window/Tab/Filter/CoreWindowTabFilterDTO.js";
import TabUtil from "../../../Common/TabUtil.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";

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

    bindModelToUI(coreWindowTabFilterDTO, observerChangeListenerInstance, observerChangeListenerMethodInvoke) {
        super.bindModelToUI(coreWindowTabFilterDTO);
        if (coreWindowTabFilterDTO instanceof CoreWindowTabFilterDTO) {
            TabUtil.createEditorFromCoreWindowTabFilterDTO(coreWindowTabFilterDTO, (id, editorInstance) => {
                this.getEditor().set(id, editorInstance);
                editorInstance.addListener(EventFrameWork.event.Editors.FieldChangeEvent, observerChangeListenerMethodInvoke, observerChangeListenerInstance);
            })
        }
    }
}


export const FilterTabControllerFunction = {
    ChangeFilterFunction: 'ChangeFilterFunction',
}

export class FilterTabControllerFunctionFactory {
    static Factory(ChangeFilterFunction) {
        let json = {};
        if (ChangeFilterFunction) {
            json[FilterTabControllerFunction.ChangeFilterFunction] = ChangeFilterFunction;
        }
        return json;
    }
}
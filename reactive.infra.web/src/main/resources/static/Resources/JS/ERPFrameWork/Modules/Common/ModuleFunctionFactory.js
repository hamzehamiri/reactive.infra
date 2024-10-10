export default class ModuleFunctionFactory {

    static Factory(RequestCancel, RequestParentModel, DragElementMatcherFunction) {
        let json = {};
        if (RequestCancel) {
            json[ModuleFunction.RequestCancel] = RequestCancel;
        }
        if (RequestParentModel) {
            json[ModuleFunction.RequestParentModel] = RequestParentModel;
        }
        if (DragElementMatcherFunction) {
            json[ModuleFunction.DragElementMatcherFunction] = DragElementMatcherFunction;
        }
        return json;
    }

    static FactoryRequestParentModel(originalModel, coreAllElementDTO, recordId) {
        return {
            [ModuleRequestParentModelElement.OriginalModel]: originalModel,
            [ModuleRequestParentModelElement.CoreAllElementDTO]: coreAllElementDTO,
            [ModuleRequestParentModelElement.RecordId]: recordId,
        }
    }

}

export const ModuleFunction = {
    RequestCancel: 'RequestCancel',
    RequestParentModel: 'RequestParentModel',
    DragElementMatcherFunction: 'DragElementMatcherFunction'
}

export const ModuleRequestParentModelElement = {
    OriginalModel: 'OriginalModel',
    CoreAllElementDTO: 'CoreAllElementDTO',
    RecordId: 'RecordId'
}
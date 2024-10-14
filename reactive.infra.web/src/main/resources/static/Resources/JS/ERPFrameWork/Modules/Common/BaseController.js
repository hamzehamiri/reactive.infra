import {UUID} from "../../../UIFrameWork/Shared/Common/UUID.js";
import {BaseObservable} from "../../../UIFrameWork/Shared/Event/BaseObservable.js";
import CoreTranslateRequestDTO from "../../Communicate/Models/Request/CoreTranslateRequestDTO.js";
import {RegisterComponent} from "../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import WebTranslateServiceClient from "../../Communicate/XMLHttpRequest/Services/Translate/WebTranslateServiceClient.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {HTMLComponent} from "../../../UIFrameWork/HTML/Component/HTMLComponent.js";

export default class BaseController extends BaseObservable {

    static Init() {
        BaseController.map = new Map();
    }

    constructor() {
        super();
        let uuid = UUID.create();
        BaseController.map.set(uuid, this);
        this.childControllersByUUID = new Map();
        this.childControllersByKeyModel = new Map();
        this.uiElements = new Map();
        this.uiVariables = new Map();
        this.enableTranslateEvent = true;
        this.dragElementMatcherFunctionArray = [];

        this.uiElements.set(BaseController.Editors, new Map());

        this.initVariables();
    }

    getEditor() {
        return this.uiElements.get(BaseController.Editors);
    }

    setEnableTranslateEventChildController(enableTranslateEvent) {
        this.childControllersByUUID.forEach((childController, uuid) => {
            if (childController instanceof BaseController) {
                childController.enableTranslateEvent = enableTranslateEvent;
            }
        });
    }

    initVariables() {

    }

    bindModelToUI(model) {
        this.model = model;
    }

    rebindModelToUI(model) {
        this.model = model;
    }

    bindProfileModelToUI(profileModel) {
        this.profileModel = profileModel;
    }

    setView(view) {
        this.view = view;
        this.view.addListener(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, (baseEvent) => {
            let component = baseEvent.getSource();
            if (component instanceof HTMLComponent) {
                this.changeLang(component.getLanguage());
            }
        });
    }

    setParentModuleModel(parentModuleModel) {
        this.parentModuleModel = parentModuleModel;
    }

    addDragElementMatcherFunction(dragElementMatcherFunction) {
        this.dragElementMatcherFunctionArray.push(dragElementMatcherFunction);
    }

    changeLang(coreTranslateLanguageDTO) {

    }

    setFilterController(filterController) {
        this.filterController = filterController;
    }

    getFilterController() {
        return this.filterController;
    }

    setFilterModel(coreFilterRequestElementWithOperandDTO) {
        this.coreFilterRequestElementWithOperandDTO = coreFilterRequestElementWithOperandDTO;
    }

    getFilterModel() {
        return this.coreFilterRequestElementWithOperandDTO;
    }

    getView() {
        return this.view;
    }

    setParentContainer(parentContainer) {
        this.parentContainer = parentContainer;
        this.getView().setParentContainer(parentContainer);
    }

    getParentContainer() {
        return this.getView().getParentContainer();
    }

    getModel() {
        return this.model;
    }

    translateService(registerKey, componentMask, callBackFinal) {
        let coreTranslateRequestDTO = new CoreTranslateRequestDTO();
        coreTranslateRequestDTO.setCoreTranslateLanguageDTO(RegisterComponent.getCurrentLanguage());
        coreTranslateRequestDTO.setRegisterKey(registerKey);

        new WebTranslateServiceClient(componentMask).Translate(coreTranslateRequestDTO, (coreTranslateDTOMap) => {
            if (coreTranslateDTOMap instanceof Map) {
                coreTranslateDTOMap.forEach((coreTranslateDTO, recordId) => {
                    let key = coreTranslateDTO.getCoreGeneralRecordDTO()['name'].toLowerCase();
                    if (key)
                        this.translateModelInvoke(key, coreTranslateDTO.getTranslateValue());
                });
            }
            if (callBackFinal)
                callBackFinal();
        });
    }

    translateModelInvoke(key, translateValue) {

    }
}

BaseController.Editors = "Editors";
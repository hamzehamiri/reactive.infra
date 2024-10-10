import BaseController from "../../../Common/BaseController.js";
import ProcessView from "../View/ProcessView.js";
import {ConfirmPanelEvent} from "../../../Common/Confirm/ConfirmPanel.js";
import CoreProcessRequestDTO from "../../../../Communicate/Models/Request/Process/CoreProcessRequestDTO.js";
import WebSocketProcessExecutionServiceClient from "../../../../Communicate/WebSocket/NewService/Process/WebSocketProcessExecutionServiceClient.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import WebProcessFindProcessService from "../../../../Communicate/XMLHttpRequest/Services/Process/WebProcessFindProcessService.js";
import TabUtil from "../../../Common/TabUtil.js";
import {WebEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import ProcessDialog from "../../../Components/HTML/ProcessDialog/ProcessDialog.js";
import {ProcessDialogCommandPanelEvent} from "../../../Components/HTML/ProcessDialog/ProcessDialogCommandPanel.js";
import CoreProcessRequestStatusDTO from "../../../../Communicate/Models/Request/Process/CoreProcessRequestStatusDTO.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import CoreProcessDTO from "../../../../Communicate/Models/Response/Process/CoreProcessDTO.js";
import CoreProcessParamDTO from "../../../../Communicate/Models/Response/Process/CoreProcessParamDTO.js";
import {ModuleRequestParentModelElement} from "../../../Common/ModuleFunctionFactory.js";

export default class ProcessController extends BaseController {
    constructor(parentContainer, recordId) {
        super();

        this.recordId = recordId;
        let view = new ProcessView();
        view.addListener(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, (baseEvent) => {
            let component = baseEvent.getSource();
            if (component instanceof HTMLComponent) {
                this.setEnableTranslateEventChildController(false);
                this.changeLang(component.getLanguage());
            }
        });
        view.getConfirmPanel().addListener(ConfirmPanelEvent.AcceptEvent, () => {
            let processDialog = new ProcessDialog();
            processDialog.showCenterElement(this.getView().getElement(), 250);
            processDialog.getProcessDialogCommandPanel().addListener(ProcessDialogCommandPanelEvent.PauseEvent, () => {
                new WebSocketProcessExecutionServiceClient(this.getView().getFormView()).send(this.createCoreProcessRequestDTO(CoreProcessRequestStatusDTO.statusLifeCycle.Pause, this.getView().getLanguage()), (coreProcessResponseDTO, percent) => {

                });
            });
            processDialog.getProcessDialogCommandPanel().addListener(ProcessDialogCommandPanelEvent.ResumeEvent, () => {
                new WebSocketProcessExecutionServiceClient(this.getView().getFormView()).send(this.createCoreProcessRequestDTO(CoreProcessRequestStatusDTO.statusLifeCycle.Resume, this.getView().getLanguage()), (coreProcessResponseDTO, percent) => {

                });
            });
            processDialog.getProcessDialogCommandPanel().addListener(ProcessDialogCommandPanelEvent.TerminateEvent, () => {
                new WebSocketProcessExecutionServiceClient(this.getView().getFormView()).send(this.createCoreProcessRequestDTO(CoreProcessRequestStatusDTO.statusLifeCycle.Terminate, this.getView().getLanguage()), (coreProcessResponseDTO, percent) => {
                    this.getView().getFormView().unMaskComponent();
                    this.getView().getProcessViewSideBar().addItemHistory(coreProcessResponseDTO);
                    processDialog.hide();
                });
            });
            new WebSocketProcessExecutionServiceClient(this.getView().getFormView()).send(this.createCoreProcessRequestDTO(CoreProcessRequestStatusDTO.statusLifeCycle.Start, this.getView().getLanguage()), (coreProcessResponseDTO, percent) => {
                processDialog.percentDraw(percent);
                this.getView().getProcessViewSideBar().addItemHistory(coreProcessResponseDTO);
                if (percent === 1) {
                    this.getView().getFormView().unMaskComponent();
                    processDialog.hide();
                }
            });
        }, this);

        this.setView(view);
        this.getView().setParentContainer(parentContainer);
    }

    changeLang(coreTranslateLanguageDTO) {
        let coreProcessRequestDTO = this.createCoreProcessRequestDTO(new CoreProcessRequestStatusDTO(), coreTranslateLanguageDTO);

        let webProcessFindProcessService = new WebProcessFindProcessService(this.getView());
        webProcessFindProcessService.FindProcess(coreProcessRequestDTO, (coreProcessDTOArray) => {
            if (coreProcessDTOArray instanceof Array) {
                coreProcessDTOArray.forEach((coreProcessDTO) => {
                    if (coreProcessDTO instanceof CoreProcessDTO) {
                        if (coreProcessDTO.getTranslate())
                            this.getView().getParentContainer().setTitle(coreProcessDTO.getTranslate());
                        coreProcessDTO.getCoreProcessParamDTOMap().forEach((coreProcessParamDTO) => {
                            if (coreProcessParamDTO instanceof CoreProcessParamDTO) {
                                let webEditor = this.getView().getEditorMap().get(coreProcessParamDTO.getId());
                                if (webEditor instanceof WebEditor) {
                                    webEditor.setGeneratePlaceHolderLabel(coreProcessParamDTO.getTranslate());
                                }
                            }
                        })
                    }
                });
            }
        });
    }

    createCoreProcessRequestDTO(coreProcessRequestStatusDTO, coreTranslateLanguageDTO) {
        let coreProcessParamValueMap = new Map();
        let coreProcessRequestDTO = new CoreProcessRequestDTO();
        coreProcessRequestDTO.setId(this.recordId);
        coreProcessRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);
        coreProcessRequestDTO.setCoreProcessParamValueMap(coreProcessParamValueMap);
        coreProcessRequestDTO.setUUID(this.getView().getUUID());
        coreProcessRequestDTO.setCoreProcessRequestStatusDTO(coreProcessRequestStatusDTO);
        if (this.parentModuleModel) {
            let recordModels = this.parentModuleModel[ModuleRequestParentModelElement.OriginalModel];
            coreProcessRequestDTO.setRecordModelDTOList(recordModels);
        }
        this.getView().getEditorMap().forEach((webEditor, id) => {
            if (webEditor instanceof WebEditor) {
                coreProcessParamValueMap.set(id, webEditor.getValue());
            }
        });

        return coreProcessRequestDTO;
    }

    start() {
        let coreProcessRequestDTO = this.createCoreProcessRequestDTO(new CoreProcessRequestStatusDTO(), this.getView().getLanguage());
        if (this.getView().getParentContainer() instanceof TabItem) {
            this.getView().getParentContainer().setTitle("Process");
        }

        let webProcessFindProcessService = new WebProcessFindProcessService(this.getView());
        webProcessFindProcessService.FindProcess(coreProcessRequestDTO, (coreProcessDTOArray) => {
            if (coreProcessDTOArray instanceof Array) {
                coreProcessDTOArray.forEach((coreProcessDTO) => {
                    if (coreProcessDTO.getTranslate())
                        this.getView().getParentContainer().setTitle(coreProcessDTO.getTranslate());
                    TabUtil.createEditorFromCoreProcessDTO(coreProcessDTO, (id, editorInstance) => {
                        this.getView().getEditorMap().set(id, editorInstance);
                    });
                    let sortedEditor = TabUtil.startSortProcessParam(this.getView().getEditorMap());
                    this.getView().getFormView().setEditorsWithLayout(this.getView().getEditorMap(), null, sortedEditor);
                    // this.getView().getFormView().bindRecordToUI(RecordDescriptors.WebEditorMapValue(coreWindowTabResponseSearchDTO))
                });
            }

        });

        if (this.dragElementMatcherFunctionArray) {
            for (let dragElementMatcherFunction of this.dragElementMatcherFunctionArray) {
                dragElementMatcherFunction((event) => {
                    let valid = this.getView().canvasElement.containElement(event);
                    return !valid;
                });
            }
        }
    }
}
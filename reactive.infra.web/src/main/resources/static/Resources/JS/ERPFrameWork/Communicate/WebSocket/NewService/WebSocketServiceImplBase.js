import {BaseObservable} from "../../../../UIFrameWork/Shared/Event/BaseObservable.js";
import {UUID} from "../../../../UIFrameWork/Shared/Common/UUID.js";
import WebSocketSingleton from "../Base/WebSocketSingleton.js";
import WebAlertDialog from "../../../../UIFrameWork/HTML/Alert/WebAlertDialog.js";
import MaskComponent from "../../../Modules/Components/HTML/Mask/MaskComponent.js";

export default class WebSocketServiceImplBase extends BaseObservable {

    constructor(component) {
        super();
        this.component = component;

        this.uuid = UUID.create();

        this.service = WebSocketSingleton.instance();
        this.service.register(this.uuid, this);
    }

    convertBody(body) {

    }

    setServiceName(serviceName) {
        this.serviceName = serviceName;
    }

    showError(errorResponseDTO) {
        let webAlert = new WebAlertDialog();
        webAlert.setMessageError(errorResponseDTO);
        if (this.component)
            webAlert.showCenterElement(this.component.getElement(), 300);
    }

    onMessageReceive() {
        if (this.component)
            this.component.unMaskComponent();
    }

    sendModel(model) {
        if (this.component) {
            this.component.showMaskComponent(new MaskComponent(), 150, 150, this.component.getElement());
        }
        this.service.sendModel(model, this.serviceName, this.uuid);
    }
}
import {WebSocketEvent, WebSocketService} from "../../../../ProxyService/WebSocketService.js";
import WebEnvironment from "../../Common/WebEnvironment.js";
import {WebTextEditor} from "../../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";

export default class WebSocketBaseService extends WebSocketService {

    constructor(security, component) {
        super();
        this.mapHeader = new Map();
        this.security = security;
        this.component = component;
    }

    request(url, webSocketType, security) {
        this.security = security;
        super.request(url, webSocketType);

        this.addListener(WebSocketEvent.OnMessage, (event) => {
            if (this.component) {
                this.component.unMaskComponent();
            }
            try {
                let jsonData = JSON.parse(event.data);
                this.convertJsonToModel(jsonData);
            } catch (e) {

            }
        });
    }

    convertJsonToModel(json) {

    }

    send(data) {
        super.send(data);
        if (this.component) {
            this.component.showMaskComponent(new WebTextEditor(), 200, 200, this.component.getElement());
        }
    }

    getWebSocketURL() {
        let urlService = super.getWebSocketURL();
        if (this.security) {
            let token = WebEnvironment.GetToken();
            document.cookie = 'X-Authorization=' + token + '; path=/';
        }
        return urlService;
    }
}
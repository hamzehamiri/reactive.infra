import {SSEService, SSEEvent} from "../../../../ProxyService/SSEService.js";

export default class SSEBaseService extends SSEService {
    constructor(url, component, withCredentials, security) {
        super(url, withCredentials, security);
        this.component = component;
        this.addListener(SSEEvent.messageData, (event) => {
            let message = event.data;
            this.convertJsonToModel(message)
        });
    }

    convertJsonToModel(messageJson) {

    }
}
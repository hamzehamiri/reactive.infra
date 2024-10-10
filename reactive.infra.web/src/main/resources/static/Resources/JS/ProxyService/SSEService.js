import {BaseObservable} from "../UIFrameWork/Shared/Event/BaseObservable.js";
import WebEnvironment from "../ERPFrameWork/Communicate/Common/WebEnvironment.js";
import CommunicateConstantURL from "../ERPFrameWork/Communicate/Common/CommunicateConstantURL.js";
import {Util} from "../UIFrameWork/Shared/Common/Util.js";

export const SSEEvent = {
    ping: "ping",
    messageData: 'messageData',
    errorData: 'errorData',
    openData: 'openData'
}

export class SSEService extends BaseObservable {
    constructor(url, withCredentials, security) {
        super();
        this.url = url;
        this.withCredentials = withCredentials;
        this.security = security;
        this.mapHeader = new Map();
    };

    send() {
        if (this.security) {
            this.securityHeaderAppend();
        }

        if (this.withCredentials) {
            this.mapHeader.set("withCredentials", this.withCredentials);
        }

        this.eventSource = null
        if (this.mapHeader.size > 0) {
            let jsonHeaderString = Util.ConvertMapToJson(this.mapHeader);
            this.eventSource = new EventSource(this.url, {
                    withCredentials: true,
                });
        } else {
            this.eventSource = new EventSource(this.url);
        }

        this.eventSource.onmessage = (event) => {
            this.fireEvent(SSEEvent.messageData, event);
        };
        this.eventSource.onopen = (event) => {
            this.fireEvent(SSEEvent.openData, event);
        }
        this.eventSource.onerror = (error) => {
            if (error.target.readyState === EventSource.CLOSED) {
                console.log('eventsource closed (' + error.target.readyState + ')')
            }
            this.eventSource.close();
            this.fireEvent(SSEEvent.errorData, error);
        }
    }

    securityHeaderAppend() {
        let token = WebEnvironment.GetToken();
        if (token) {
            this.mapHeader.set(CommunicateConstantURL.TokenHeaderKey(), CommunicateConstantURL.BearValue() + token);
        } else {
            throw "User Not Login";
        }
    }
}
export class BaseObservable {
    constructor() {

    }

    addListener(eventName, func, observer) {
        this.getListenerByEventName(eventName).push([func, observer]);
    }

    removeListener(eventName, observer) {
        let functionObserver = this.getListenerByEventName(eventName);
        if (functionObserver) {
            let index = functionObserver.findIndex((functionObserver) => {
                return functionObserver[1] === observer;
            });
            if (index > -1)
                functionObserver.splice(index, 1);
        }
    }

    fireEvent(eventName, baseEvent) {
        let functionObserver = this.getListenerByEventName(eventName);

        if (functionObserver) {
            functionObserver.forEach((functionObserver) => {
                let func = functionObserver[0];
                let observer = functionObserver[1];
                let typeFunctionName = typeof (func);
                switch (typeFunctionName) {
                    case "function":
                        func.call(observer, baseEvent);
                        break;
                    case "string":
                        func.call(observer, baseEvent);
                        break;
                }
            })
        }
    }

    getMapListener() {
        if (!this.mapListener) {
            this.mapListener = new Map();
        }
        return this.mapListener;
    }

    getListenerByEventName(eventName) {
        let listeners = this.getMapListener().get(eventName);
        if (!listeners) {
            listeners = [];
            this.getMapListener().set(eventName, listeners);
        }
        return listeners;
    }
}
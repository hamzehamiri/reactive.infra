export class ClientLogger {
    constructor() {

    }

    static Log(LogLevel, msg) {
        console.log('Log Level : ' + LogLevel.toString() + ' Message : ' + msg);
    }
}

export const LogLevel = Object.freeze({
    Debug: Symbol("Debug"),
    Error: Symbol("Error"),
    Info: Symbol("Info")
});
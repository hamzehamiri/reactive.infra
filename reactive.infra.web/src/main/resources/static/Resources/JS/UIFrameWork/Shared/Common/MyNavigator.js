export default class MyNavigator {

    constructor() {
        let userAgent = window.navigator.userAgent;
        this.setChrome(userAgent.indexOf('Chrome') > 0);
        this.setFireFox(userAgent.indexOf('Firefox') > 0);
    }

    setFireFox(fireFox) {
        this.fireFox = fireFox;
    }

    isFireFox() {
        return this.fireFox;
    }

    setChrome(chrome) {
        this.chrome = chrome;
    }

    isChrome() {
        return this.chrome;
    }

    static Instance() {
        if (!this.Navigator)
            this.Navigator = new MyNavigator();
        return this.Navigator;
    }
}

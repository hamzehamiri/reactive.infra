export class WorkerInline {
    constructor(func) {
        let that = this;
        this.WORKER_ENABLED = !!(URL && Blob && Worker);
        if (this.WORKER_ENABLED) {
            let functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
            let url = URL.createObjectURL(new Blob([functionBody], {type: "text/javascript"}));
            return new Worker(url);
        } else {
            this.self = self;
            this.self.postMessage = function (data) {
                setTimeout(function () {
                    that.onmessage({data: data});
                }, 0);
            };

            setTimeout(function () {
                func.call(self);
            }, 0);
        }
    }
}
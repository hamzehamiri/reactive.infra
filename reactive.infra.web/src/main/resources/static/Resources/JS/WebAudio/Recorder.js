import {WorkerInline} from "../WebWorker/WorkerInline.js";

export class Recorder {
    constructor() {
        this.videoEnable = false;
        this.audioEnable = false;
    }

    setVideoEnable(enable) {
        this.videoEnable = enable;
    }

    setAudioEnable(enable) {
        this.audioEnable = enable;
    }

    Recording(recording) {
        this.recording = recording;
    }

    postInitWorkerStreamRecord(context) {
        let that = this;
        this.worker.postMessage({
            command: 'init',
            config: {
                sampleRate: context.sampleRate,
                numChannels: that.config.numChannels
            }
        });
    }

    postRecordDataWorkerStreamRecord(buffer) {
        this.worker.postMessage({
            command: 'record',
            buffer: buffer
        });
    }

    listenWorkerStreamThread() {
        this.worker.onmessage = function (e) {
            console.log(e.data.command);
            // let cb = that.callbacks[e.data.command].pop();
            // if (typeof cb == 'function') {
            //     cb(e.data.data);
            // }
        };
    }

    createWorkerStreamRecord() {
        let self = {};
        this.worker = new WorkerInline(function () {
                let recLength = 0,
                    recBuffers = [],
                    sampleRate = undefined,
                    numChannels = undefined;

                self.onmessage = function (e) {
                    switch (e.data.command) {
                        case 'init':
                            init(e.data.config);
                            break;
                        case 'record':
                            record(e.data.buffer);
                            break;
                    }
                };

                function init(config) {
                    sampleRate = config.sampleRate;
                    numChannels = config.numChannels;
                    initBuffers();
                }

                function initBuffers() {
                    for (let channel = 0; channel < numChannels; channel++) {
                        recBuffers[channel] = [];
                    }
                }

                function record(inputBuffer) {
                    for (let channel = 0; channel < numChannels; channel++) {
                        recBuffers[channel].push(inputBuffer[channel]);
                    }
                    recLength += inputBuffer[0].length;
                }
            }
        );
    }

    streamCap(stream) {
        let that = this;
        let audioContext = new AudioContext();
        let input = audioContext.createMediaStreamSource(stream);
        let context = input.context;
        let node = (context.createScriptProcessor || context.createJavaScriptNode).call(context, that.config.bufferLen, that.config.numChannels, that.config.numChannels);
        node.onaudioprocess = function (e) {
            if (!that.recording) return;

            let buffer = [];
            for (let channel = 0; channel < that.config.numChannels; channel++) {
                buffer.push(e.inputBuffer.getChannelData(channel));
            }
            that.postRecordDataWorkerStreamRecord(buffer);
        };
        input.connect(node);
        node.connect(context.destination);

        this.createWorkerStreamRecord();
        this.listenWorkerStreamThread();
        this.postInitWorkerStreamRecord(context);
    }

    startCapture() {
        let that = this;

        this.constraint = {audio: this.audioEnable, video: this.videoEnable, peerIdentity: ''};
        this.config = {
            bufferLen: 4096,
            numChannels: 2,
            mimeType: 'audio/wav'
        };
        navigator.mediaDevices.getUserMedia(this.constraint).then(function (stream) {
            that.streamCap(stream);
        });
    }
}
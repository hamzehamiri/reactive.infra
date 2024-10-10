import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import MyNavigator from "../../../UIFrameWork/Shared/Common/MyNavigator.js";

export default class Print {
    constructor() {
        this.myNavigator = MyNavigator.Instance();
        this.params = {
            printable: null,
            fallbackPrintable: null,
            type: 'pdf',
            header: null,
            headerStyle: 'font-weight: 300;',
            maxWidth: 800,
            properties: null,
            gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
            gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
            showModal: false,
            onError: (error) => { throw error },
            onLoadingStart: null,
            onLoadingEnd: null,
            onPrintDialogClose: () => {},
            onIncompatibleBrowser: () => {},
            modalMessage: 'Retrieving Document...',
            frameId: 'printJS',
            printableElement: null,
            documentTitle: 'Document',
            targetStyle: ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height'],
            targetStyles: ['border', 'box', 'break', 'text-decoration'],
            ignoreElements: [],
            repeatTableHeader: true,
            css: null,
            style: null,
            scanStyles: true,
        }
    }

    Printer(blob , type) {
        if (blob instanceof Blob) {
            blob = window.URL.createObjectURL(blob);

            let iframe = this.IFrameCreate();
            iframe.setAttribute('src', blob)
            iframe.onload = () => {
                if (type === 'pdf') {
                    if (this.myNavigator.isFireFox()) {
                        setTimeout(() => this.PerformPrint(iframe, this.params), 1000)
                    } else {
                        this.PerformPrint(iframe, this.params)
                    }
                    return
                }
            }

            document.getElementsByTagName('body')[0].appendChild(iframe);
        }
    }

    PerformPrint(iframeElement, params) {
        try {
            iframeElement.focus()
            iframeElement.contentWindow.print();
        } catch (error) {
            params.onError(error)
        } finally {
            if (this.myNavigator.isFirefox()) {
                iframeElement.style.visibility = 'hidden'
                iframeElement.style.left = '-1px'
            }

            this.cleanUp(params)
        }
    }

    IFrameCreate() {
        let iframePrint = DOM.createElement('iframe');
        if (this.myNavigator.isFireFox()) {
            iframePrint.setAttribute('style', 'width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0')
        } else if (this.myNavigator.isChrome()) {
            iframePrint.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute; border: 0')
        }
        return iframePrint;
    }

    cleanUp(params) {
        if (params.onLoadingEnd) params.onLoadingEnd()

        // If preloading pdf files, clean blob url
        if (params.showModal || params.onLoadingStart) window.URL.revokeObjectURL(params.printable)

        // Run onPrintDialogClose callback
        let event = 'mouseover'

        if (this.myNavigator.isChrome() || this.myNavigator.isFirefox()) {
            event = 'focus'
        }

        const handler = () => {
            // Make sure the event only happens once.
            window.removeEventListener(event, handler)

            params.onPrintDialogClose()

            // Remove iframe from the DOM
            const iframe = document.getElementById(params.frameId)

            if (iframe) {
                iframe.remove()
            }
        }

        window.addEventListener(event, handler)
    }
}
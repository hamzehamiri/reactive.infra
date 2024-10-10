import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {Util} from "../../../../../UIFrameWork/Shared/Common/Util.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ProcessDialogCommandPanel extends HTMLContainer {
    constructor() {
        super();

        this.statusProcess = ProcessDialogCommandPanelStatus.PauseState;

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
        let power_off_style = {
            "classButton": "btn_power_off btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Components/Process/power-off.svg"
        };
        this.pause_style = Util.ConvertJsonToMap({
            "classButton": "btn_pause btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Components/Process/pause.svg"
        });
        this.resume_style = Util.ConvertJsonToMap({
            "classButton": "btn_resume btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Components/Process/resumed.svg"
        });

        this.resumePauseBtn = new BaseButtonEditor(this.pause_style, null, true);
        this.resumePauseBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {
            if (this.statusProcess === ProcessDialogCommandPanelStatus.PauseState) {
                this.fireEvent(ProcessDialogCommandPanelEvent.PauseEvent);
            } else {
                this.fireEvent(ProcessDialogCommandPanelEvent.ResumeEvent);
            }
            this.toggleStatus();
        }, this);
        this.terminateBtn = new BaseButtonEditor(Util.ConvertJsonToMap(power_off_style), null, true);
        this.terminateBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(ProcessDialogCommandPanelEvent.TerminateEvent);
        }, this);

        this.addItem(this.resumePauseBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));
        this.addItem(this.terminateBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));
    }

    toggleStatus() {
        if (this.statusProcess === ProcessDialogCommandPanelStatus.PauseState) {
            this.resumePauseBtn.setAttributeMap(this.resume_style);
            this.statusProcess = ProcessDialogCommandPanelStatus.ResumeState;
        } else if (this.statusProcess === ProcessDialogCommandPanelStatus.ResumeState) {
            this.resumePauseBtn.setAttributeMap(this.pause_style);
            this.statusProcess = ProcessDialogCommandPanelStatus.PauseState;
        }
    }
}

export const ProcessDialogCommandPanelEvent = {
    TerminateEvent: 'TerminateEvent',
    PauseEvent: 'PauseEvent',
    ResumeEvent: 'ResumeEvent'
}

export const ProcessDialogCommandPanelStatus = {
    PauseState: 'PauseState',
    ResumeState: 'ResumeState',
}
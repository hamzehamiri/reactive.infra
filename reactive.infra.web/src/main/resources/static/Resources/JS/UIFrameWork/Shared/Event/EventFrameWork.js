export class EventFrameWork {
    constructor() {

    }
}

EventFrameWork.event = {
    scroll: 'scroll',
    resize: 'resize',
    showPopUp: 'showPopUp',
    position: 'position',
    positionEnd: 'positionEnd',
    Transition: {
        TransitionStart: 'transitionstart',
        TransitionEnd: 'transitionend',
        TransitionCancel: 'transitioncancel',
        TransitionRun: 'transitionrun'
    },
    FileInput: {
        change: 'change',
    },
    ChangeEvent: 'change',
    onInput: 'input',
    MouseEvent: {
        auxclick: 'auxclick',
        click: 'click',
        contextmenu: 'contextmenu',
        dblclick: 'dblclick',
        mousedown: 'mousedown',
        mouseenter: 'mouseenter',
        mouseleave: 'mouseleave',
        mousemove: 'mousemove',
        mouseover: 'mouseover',
        mouseout: 'mouseout',
        mouseup: 'mouseup',
        pointerlockchange: 'pointerlockchange',
        pointerlockerror: 'pointerlockerror',
        select: 'select',
        wheel: 'wheel'
    },
    DragDropSource: {
        dragstart: 'dragstart',
        dragend: 'dragend',
        dragenter: 'dragenter',
        dragleave: 'dragleave',
        dragover: 'dragover',
        drop: 'drop'
    },
    FocusEvent: 'focus',
    BlurEvent: 'blur',
    DND: {
        DNDStartDrag: 'DNDStartDrag',
        DNDStopDrag: 'DNDStopDrag',
        DNDStartDraggingPosition: 'DNDStartDraggingPosition',
        DNDStartViewPortPosition: 'DNDStartViewPortPosition',
    },
    Components: {
        Container: {
            ContainerAddItem: 'ContainerAddItem'
        },
        BaseComponent: {
            OnAfterLoad: 'OnAfterLoad',
            ChangePosition: 'ChangePosition',
            ChangeLanguage: 'ChangeLanguage',
            OnDetach: 'BaseComponentOnDetach'
        },
        PopupCalendar: {
            NextMonth: 'NextMonth',
            BeforeMonth: 'BeforeMonth'
        },
        TabPanel: {
            ClickTitle: 'ClickTitle',
            ClickClose: 'ClickClose',
            ActiveTabItem: 'ActiveTabItem',
            ChangeTitle: 'ChangeTitle'
        },
        Grid: {
            HideButtonHeader: 'hideButtonHeader'
        },
        WebGridAdvancedEditorProvider: {
            StartEditorInGrid: "StartEditorInGrid",
            StopEditorInGrid: "StopEditorInGrid"
        },
        ListView: {
            SelectItem: 'SelectItem'
        },
        Tree: {
            SelectedTreeNode: "SelectedTreeNode"
        },
        WebGridAdvanced: {
            SelectionChange: 'WebGridAdvancedSelectionChange'
        },
        Combobox: {
            ShowPopUp: 'ShowPopUp',
            ShowPopUpFilter: 'ShowPopUpFilter'
        },
        AccordionFrameItem: {
            Select: 'AccordionFrameItemSelect'
        },
        Accordion: {
            Select: 'AccordionSelect'
        },
        Drag: {
            StartDrag: 'StartDrag'
        },
        Drop: {
            Dropped: 'DroppedEvent'
        },
        WizardStateTitleComponent: {
            WizardStateTitleComponentTitleClick: 'WizardStateTitleComponentTitleClick'
        },
        ChartElementSeriesRowContainer: {
            ChartElementSeries_Add: 'ChartElementSeries_Add',
            ChartElementSeries_Remove: 'ChartElementSeries_Remove'
        },
        SideLayoutEvents: {
            SideLayoutEventsResize: 'SideLayoutEventsResize'
        },
        TemplateLayoutEvents: {
            TemplateLayoutItemClickEvent: 'TemplateLayoutItemClickEvent'
        },
        MenuEvents: {
            MenuEventsItemSelect: 'MenuEventsItemSelect'
        }
    },
    Editors: {
        FieldChangeEvent: 'FieldChangeEvent'
    },
    Login: {
        LoginSuccess: 'LoginSuccess',
        LoginFail: 'LoginFail'
    }
};

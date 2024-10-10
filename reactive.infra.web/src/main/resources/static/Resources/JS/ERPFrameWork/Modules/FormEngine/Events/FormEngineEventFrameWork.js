export default class FormEngineEventFrameWork {

}

FormEngineEventFrameWork.event = {
    Common: {
        ActiveContainer: 'ActiveContainer'
    },
    Components: {
        Paging: {
            ChangePage: 'changePageRequest'
        }
    },
    ButtonAction: {
        CommandExecute: 'CommandExecute',
        CommandCustom: 'CommandCustom'
    },
    WindowController: {
        ActiveContainerEvent: 'ActiveContainerEvent'
    },
    TabController: {
        ToolbarBindPlease: 'ToolbarBindPlease',
        SaveForm: 'SaveForm',
        TabRecordChangeHandler: {
            TabRecordChangeHandler_FieldChangeEvent: 'TabRecordChangeHandler_FieldChangeEvent'
        },
        Filter: {
            AcceptFilter: 'AcceptFilterController',
            RemoveFilter: 'RemoveFilterController'
        }
    },
    WebAttachmentEditorEvents: {
        WebAttachmentEditorDownloadEvent: 'WebAttachmentEditorDownloadEvent',
        WebAttachmentEditorUploadEvent: 'WebAttachmentEditorUploadEvent',
        WebAttachmentEditorDeleteEvent: 'WebAttachmentEditorDeleteEvent',
        WebAttachmentEditorEditEvent: 'WebAttachmentEditorEditEvent',
        WebAttachmentEditorPreviewEvent: 'WebAttachmentEditorPreviewEvent',
        WebAttachmentEditorStartUploadEvent: 'WebAttachmentEditorStartUploadEvent'
    }
}
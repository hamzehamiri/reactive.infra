import BaseController from "../../../Common/BaseController.js";
import WindowGeneratorView from "../View/WindowGeneratorView.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import WindowController from "../../Window/Controller/WindowController.js";

export default class WindowGeneratorController extends BaseController {
    constructor(parentContainer, recordId) {
        super();
        this.recordId = recordId;
        this.parentContainer = parentContainer;

        this.windowGeneratorView = new WindowGeneratorView();
        this.windowGeneratorView.setParentContainer(this.parentContainer);
        this.setView(this.windowGeneratorView);

        if (this.getView().getParentContainer() instanceof TabItem) {
            this.getView().getParentContainer().setTitle("WindowGenerator");
        }
    }

    initWithRecordID(coreTranslateLanguageDTO) {
        this.windowController = new WindowController(this.windowGeneratorView);
        this.windowController.initWithRecordID(coreTranslateLanguageDTO);
    }
}
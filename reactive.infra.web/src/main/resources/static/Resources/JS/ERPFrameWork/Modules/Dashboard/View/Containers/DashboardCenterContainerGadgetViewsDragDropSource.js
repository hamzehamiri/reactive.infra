import {DragDropSource} from "../../../../../UIFrameWork/HTML/DND/DragDropSource.js";
import Gadget from "../Gadgets/Gadget.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import CoreDashboardGadgetDTO from "../../../../Communicate/Models/Response/Dashboard/CoreDashboardGadgetDTO.js";
import ModuleFactory from "../../../Common/Factory/ModuleFactory.js";
import ErpEvents from "../../../Components/ErpEvents.js";
import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class DashboardCenterContainerGadgetViewsDragDropSource extends DragDropSource {
    constructor(dashboardCenterContainerGadgetViews) {
        super(dashboardCenterContainerGadgetViews);
    }

    addItemReadyToDrop(items) {
        super.addItemReadyToDrop(items);
        if (items != null && items instanceof Array) {
            items.forEach((item) => {
                let coreDashboardGadgetDTO = item[0].Value;
                if (coreDashboardGadgetDTO instanceof CoreDashboardGadgetDTO) {
                    let gadget = new Gadget(true);
                    gadget.addDragElementMatcherFunction((event) => {
                        return !gadget.gadgetContainerCenter.getElement().contains(event.target);
                    });
                    gadget.addListener(ErpEvents.events.Dashboard.Gadgets.DashboardGadgetPrivateToolbar.DashboardGadgetPrivateToolbarRemove, (baseEvent) => {
                        if (baseEvent instanceof BaseEvent) {
                            this.component.removeItem(baseEvent.getSource());
                        }
                    });
                    this.component.addItem(gadget, RowLayoutData.factory(1, 200, 10, 10, 10, 10, true));

                    let ModuleGadget = ModuleFactory.factoryByCoreAllElement(coreDashboardGadgetDTO.getCoreAllElementDTO());
                    let moduleInit = new ModuleGadget();
                    moduleInit.createAndAttachModule(gadget.gadgetContainerCenter, coreDashboardGadgetDTO.getRecordId());
                }
            });
        }
    }
}
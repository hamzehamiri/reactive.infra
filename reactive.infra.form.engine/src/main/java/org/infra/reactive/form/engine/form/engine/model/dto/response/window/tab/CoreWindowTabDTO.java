package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.filter.CoreWindowTabFilterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.workflow.CoreWorkflowActionDTO;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class CoreWindowTabDTO implements Serializable {
    private long id;
    private int tabIndex;
    private LocalDateTime createDate;
    private String name;
    private String translate;
    private CoreTableDTO coreTableDTO;
    private CoreAllElementDTO coreAllElementDTO;
//    private CoreWindowTabDTO coreWindowTabDTOParent;
//    private CoreWindowTabJoinColumnDTO coreWindowTabJoinColumnDTOParent;
    private CoreWorkflowActionDTO coreWorkflowActionDTO;
    private Map<Long, CoreLayoutAssignElementDTO> coreLayoutAssignElementDTOMap_Tab;
    private Map<Long, CoreLayoutAssignElementDTO> coreLayoutAssignElementDTOMap_Toolbar;
    private Map<Long, CoreWindowTabFieldDTO> coreWindowTabFieldDTOMap;
    private Map<Long, CoreButtonAssignElementDTO> coreButtonAssignElementDTOMap;
    private Map<Long, CoreWindowTabJoinColumnDTO> coreWindowTabJoinColumnDTOMap;
    private Map<Long, CoreWindowTabFilterDTO> coreWindowTabFilterDTOMap;
}

package org.infra.reactive.web.setup;

import jakarta.annotation.PostConstruct;
import org.infra.reactive.form.engine.form.engine.setup.RoleSetup;
import org.springframework.stereotype.Component;

@Component
public class ErpSetup {

    @PostConstruct
    public void setup() {
//        DatabaseServicePackExporter.getInstance().readAllTables().subscribe(coreTableDTO -> {
//            System.out.println(coreTableDTO.toString());
//        });

        RoleSetup roleSetup = new RoleSetup();
        roleSetup.startSetup();
    }
}

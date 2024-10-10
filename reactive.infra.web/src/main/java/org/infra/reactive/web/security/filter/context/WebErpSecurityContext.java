package org.infra.reactive.web.security.filter.context;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;

import java.io.Serializable;

public class WebErpSecurityContext implements Serializable {
    private CoreUserAuthenticateRequestDTO userSecurityModel;

    public WebErpSecurityContext() {

    }

    public WebErpSecurityContext(CoreUserAuthenticateRequestDTO userSecurityModel) {
        this.userSecurityModel = userSecurityModel;
    }

    public CoreUserAuthenticateRequestDTO getUserSecurityModel() {
        return userSecurityModel;
    }

    public void setUserSecurityModel(CoreUserAuthenticateRequestDTO userSecurityModel) {
        this.userSecurityModel = userSecurityModel;
    }
}

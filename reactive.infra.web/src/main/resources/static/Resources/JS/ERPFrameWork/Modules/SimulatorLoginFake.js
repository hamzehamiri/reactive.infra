import CoreUserAuthenticateRequestDTO from "../Communicate/Models/Request/CoreUserAuthenticateRequestDTO.js";
import WebLoginServiceClient from "../Communicate/XMLHttpRequest/Services/Login/WebLoginServiceClient.js";
import WebEnvironment from "../Communicate/Common/WebEnvironment.js";
import {InfraMainPageController} from "./Home/InfraMainPageController.js";
import CoreUserTenantDTO from "../Communicate/Models/Response/Security/User/CoreUserTenantDTO.js";
import CoreRoleDTO from "../Communicate/Models/Response/Security/Role/CoreRoleDTO.js";

export default class SimulatorLoginFake {
    constructor() {
    }

    static fakeLogin(defaultLang) {
        let coreUserTenantDTO = new CoreUserTenantDTO();
        coreUserTenantDTO.applyData({
            active: true,
            coreTenantDTO: {id: 3, name: 'شرکت نفت خوزستان - واحد والی', coreTenantTypeId: null, coreTenantMetaDataId: null},
            coreUserDTO: {id: 2, userName: null},
            id: 1,
            password: null
        });
        let coreRoleMetaDataDTO = new CoreRoleDTO();
        coreRoleMetaDataDTO.applyData({id: 1, name: 'Stock Manager', title: 'Stock Manager'});

        let coreUserAuthenticateRequestDTO = new CoreUserAuthenticateRequestDTO();
        coreUserAuthenticateRequestDTO.setUserName("hamzehamiri");
        coreUserAuthenticateRequestDTO.setPassword("hamzehamiri");
        coreUserAuthenticateRequestDTO.setLanguage(defaultLang);
        coreUserAuthenticateRequestDTO.setTenant(coreUserTenantDTO);
        coreUserAuthenticateRequestDTO.setRoles([coreRoleMetaDataDTO]);

        new WebLoginServiceClient().Login(coreUserAuthenticateRequestDTO, (coreUserAuthenticateResponseDTO) => {
            if (coreUserAuthenticateResponseDTO.getToken()) {
                WebEnvironment.SetCoreUserAuthenticateRequestDTO(coreUserAuthenticateRequestDTO, true);
                WebEnvironment.SetCoreUserAuthenticateResponseDTO(coreUserAuthenticateResponseDTO, true);
                WebEnvironment.SetToken(coreUserAuthenticateResponseDTO.getToken(), true);
                WebEnvironment.SetCoreTranslateLanguageDTO(defaultLang, true);
                new InfraMainPageController().start();
            }
        }, null);
    }
}
import {RegisterComponent} from "./UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import LoginFactory from "./ERPFrameWork/Modules/Login/LoginFactory.js";
import {HTTPRequestType, XMLHttpRequestListener, XMLHttpRequestRequest} from "./ProxyService/XMLHttpRequestService.js";
import CommunicateConstantURL from "./ERPFrameWork/Communicate/Common/CommunicateConstantURL.js";
import CoreTranslateLanguageDTO from "./ERPFrameWork/Communicate/Models/Response/Translate/CoreTranslateLanguageDTO.js";
import WebEnvironment from "./ERPFrameWork/Communicate/Common/WebEnvironment.js";
import SimulatorLoginFake from "./ERPFrameWork/Modules/SimulatorLoginFake.js";
import StartUp from "./StartUp.js";
import PageDataDTO from "./ERPFrameWork/Communicate/Models/Request/Common/PageDataDTO.js";
import KeyValueDTO from "./ERPFrameWork/Communicate/Common/DataProvider/Impl/KeyValueDTO.js";
import {InfraMainPageController} from "./ERPFrameWork/Modules/Home/InfraMainPageController.js";
import WebThemeEditor from "./ERPFrameWork/Modules/Login/Editors/WebTheme/WebThemeEditor.js";

window.onload = function () {
    StartUp.Init();
    initInfraStructure();
}

const initInfraStructure = () => {
    let xmlHttpRequest = new XMLHttpRequestRequest(false, false);
    xmlHttpRequest.request(CommunicateConstantURL.GetAllLanguages, HTTPRequestType.POST);
    xmlHttpRequest.addListener(XMLHttpRequestListener.onreadystatechange, (event) => {
        if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
            let jsonArray = JSON.parse(event.currentTarget.responseText);
            let allCoreTranslateLanguage = [];
            let defaultLang;
            jsonArray.forEach((pageDTOJson) => {
                let pageDataDTO = new PageDataDTO()
                pageDataDTO.applyData(pageDTOJson);

                let coreTranslateLanguageJson = pageDataDTO.getRecordModelDTO().getFieldValues().get(1);

                let coreTranslateLanguageKeyValue = new KeyValueDTO();
                coreTranslateLanguageKeyValue.applyData(coreTranslateLanguageJson);

                let coreTranslateLanguageDTO = new CoreTranslateLanguageDTO();
                coreTranslateLanguageDTO.applyData(coreTranslateLanguageKeyValue.getOriginalData());
                if (coreTranslateLanguageDTO.getLocaleName().indexOf("fa_IR") > -1) {
                    defaultLang = coreTranslateLanguageDTO;
                }
                allCoreTranslateLanguage.push(coreTranslateLanguageDTO);
            });

            let coreThemeDTO = WebThemeEditor.ListTheme()[0];
            let saveCoreThemeDTO = WebEnvironment.GetCurrentCoreThemeDTO();
            let saveCoreTranslateLanguageDTO = WebEnvironment.GetCoreTranslateLanguageDTO()

            WebEnvironment.SetAllCoreTranslateLanguage(allCoreTranslateLanguage);
            if (saveCoreThemeDTO) {
                saveCoreThemeDTO = WebThemeEditor.findThemeById(saveCoreThemeDTO.getId());
                RegisterComponent.setCurrentTheme(saveCoreThemeDTO.getJsonCss());
            } else {
                WebEnvironment.SetCurrentCoreThemeDTO(coreThemeDTO);
                RegisterComponent.setCurrentTheme(coreThemeDTO.getJsonCss());
            }

            if (saveCoreTranslateLanguageDTO) {
                RegisterComponent.setCurrentLanguage(saveCoreTranslateLanguageDTO);
            } else {
                RegisterComponent.setCurrentLanguage(defaultLang);
            }

            if (2 < 1) {
                SimulatorLoginFake.fakeLogin(defaultLang);
            } else {
                LoginFactory.LoginFactoryWithDefaults((event) => {
                    LoginFactory.AfterLogin(event);
                    new InfraMainPageController().start();
                }, true, false);
            }

        }
    });
    xmlHttpRequest.send();
}


import CoreTranslateLanguageDTO from "../Models/Response/Translate/CoreTranslateLanguageDTO.js";
import WebLocalStorageService from "../../../WebStore/WebLocalStorageService.js";
import CoreUserAuthenticateRequestDTO from "../Models/Request/CoreUserAuthenticateRequestDTO.js";
import WebSocketSingleton from "../WebSocket/Base/WebSocketSingleton.js";
import WebCookiesService from "../../../WebStore/WebCookiesService.js";
import WebPasswordCredential from "../../../WebStore/WebPasswordCredential.js";
import CoreUserAuthenticateResponseDTO from "../Models/Response/Security/CoreUserAuthenticateResponseDTO.js";
import {SideLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import ViewPortLayoutDataDTO from "../Models/Response/Profile/ViewPort/ViewPortLayoutDataDTO.js";
import CoreThemeDTO from "../Models/Response/Translate/CoreThemeDTO.js";

export default class WebEnvironment {
    static KeyRequest() {
        return "Request";
    }

    static KeyResponse() {
        return "Response";
    }

    static KeyLang() {
        return "Lang";
    }

    static KeyTheme() {
        return "theme";
    }

    static KeyToken() {
        return "Token";
    }

    static SetCurrentCoreThemeDTO(coreThemeDTO, saveStore) {
        if (saveStore) {
            WebEnvironment.GetWebStore().saveData(WebEnvironment.KeyTheme(), coreThemeDTO);
        }
        WebEnvironment.coreThemeDTO = coreThemeDTO;
    }

    static GetCurrentCoreThemeDTO() {
        if (WebEnvironment.coreThemeDTO) {
            return WebEnvironment.coreThemeDTO;
        } else {
            return WebEnvironment.GetWebStore().getDataByConvert(WebEnvironment.KeyTheme(), CoreThemeDTO);
        }
    }

    static SetCoreTranslateLanguageDTO(coreTranslateLanguageDTO, saveStore) {
        if (saveStore) {
            WebEnvironment.GetWebStore().saveData(WebEnvironment.KeyLang(), coreTranslateLanguageDTO);
        }
        if (coreTranslateLanguageDTO instanceof CoreTranslateLanguageDTO) {
            WebEnvironment.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
        }
    }

    static GetCoreTranslateLanguageDTO() {
        if (WebEnvironment.coreTranslateLanguageDTO) {
            return WebEnvironment.coreTranslateLanguageDTO;
        } else {
            return WebEnvironment.GetWebStore().getDataByConvert(WebEnvironment.KeyLang(), CoreTranslateLanguageDTO);
        }
    }

    static SetCoreUserAuthenticateRequestDTO(coreUserAuthenticateRequestDTO, saveStore) {
        if (saveStore) {
            WebEnvironment.GetWebStore().saveData(WebEnvironment.KeyRequest(), coreUserAuthenticateRequestDTO);
            new WebCookiesService().saveData(WebEnvironment.KeyRequest(), coreUserAuthenticateRequestDTO);
            new WebPasswordCredential().saveData(WebEnvironment.KeyRequest(), coreUserAuthenticateRequestDTO);
        }

        if (coreUserAuthenticateRequestDTO instanceof CoreUserAuthenticateRequestDTO) {
            WebEnvironment.coreUserAuthenticateRequestDTO = coreUserAuthenticateRequestDTO;
        }
    }

    static SetCoreUserAuthenticateResponseDTO(coreUserAuthenticateResponseDTO, saveStore) {
        if (saveStore) {
            WebEnvironment.GetWebStore().saveData(WebEnvironment.KeyResponse(), coreUserAuthenticateResponseDTO);
        }

        if (coreUserAuthenticateResponseDTO instanceof CoreUserAuthenticateResponseDTO) {
            WebEnvironment.coreUserAuthenticateResponseDTO = coreUserAuthenticateResponseDTO;
        }
    }

    static SetToken(token, saveStore) {
        if (saveStore) {
            WebEnvironment.GetWebStore().saveData(WebEnvironment.KeyToken(), token);
        }
        WebEnvironment.token = token;
        WebSocketSingleton.instance().start();
    }

    static GetCoreUserAuthenticateRequestDTO() {
        if (WebEnvironment.coreUserAuthenticateRequestDTO) {
            return WebEnvironment.coreUserAuthenticateRequestDTO;
        } else {
            return WebEnvironment.GetWebStore().getDataByConvert(WebEnvironment.KeyRequest(), CoreUserAuthenticateRequestDTO);
        }
    }

    static GetToken() {
        return WebEnvironment.token;
    }

    static GetWebStore() {
        if (!WebEnvironment.webStore)
            WebEnvironment.webStore = new WebLocalStorageService();
        return WebEnvironment.webStore;
    }

    static SetAllCoreTranslateLanguage(allCoreTranslateLanguage) {
        WebEnvironment.allCoreTranslateLanguage = allCoreTranslateLanguage;
    }

    static GetAllCoreTranslateLanguage() {
        return WebEnvironment.allCoreTranslateLanguage;
    }

    static SetERPMainPageView(eRPMainPageView) {
        WebEnvironment.eRPMainPageView = eRPMainPageView;
    }

    static GetERPMainPageView() {
        return WebEnvironment.eRPMainPageView;
    }

    static SetPositionGlobalFloatButton(position) {
        WebEnvironment.position = position;
        WebEnvironment.GetWebStore().saveData("Position", position);
    }

    static GetPositionGlobalFloatButton() {
        let position = WebEnvironment.position != null ? WebEnvironment.position : WebEnvironment.GetWebStore().getDataByConvert("Position", JSON);
        if (!position) {
            position = {x: 100, y: 100};
            WebEnvironment.SetPositionGlobalFloatButton(position);
        }
        return position;
    }

    static SetLayoutDataViewPort(sideLayoutDataList) {
        WebEnvironment.sideLayoutDataList = sideLayoutDataList;
        WebEnvironment.GetWebStore().saveData("SideLayoutDataList", sideLayoutDataList);
    }

    static GetLayoutDataViewPort() {
        let sideLayoutDataList = WebEnvironment.sideLayoutDataList != null ? WebEnvironment.sideLayoutDataList : WebEnvironment.GetWebStore().getDataByConvert("SideLayoutDataList", ViewPortLayoutDataDTO);
        if (!sideLayoutDataList) {
            sideLayoutDataList = new ViewPortLayoutDataDTO();
            sideLayoutDataList.setTop(SideLayoutData.factory(SideLayoutData.Side.Top, 54, true, false, true, true, 0, 0, 0, 0));
            sideLayoutDataList.setLeft(SideLayoutData.factory(SideLayoutData.Side.Left, 320, true, false, true, true, 0, 0, 0, 0, 1));
            sideLayoutDataList.setCenter(SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, true, false, 0, 0, 0, 0));

            WebEnvironment.SetLayoutDataViewPort(sideLayoutDataList);
        }
        return sideLayoutDataList;
    }
}
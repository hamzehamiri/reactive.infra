import {BaseModel} from "../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreWindowTabResponseSearchDTO from "../Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import {Util} from "../../../UIFrameWork/Shared/Common/Util.js";
import DataProviderAbstract from "./DataProvider/DataProviderAbstract.js";
import CoreTableColumnDataProviderWithSerializerDTO from "../Models/Response/Table/Column/CoreTableColumnDataProviderWithSerializerDTO.js";
import CoreTableColumnDataProviderTypeEnum from "../Models/Response/Table/Column/CoreTableColumnDataProviderTypeEnum.js";
import SerializerFactory from "../../Modules/FormEngine/WebEditors/Serializers/SerializerFactory.js";
import KeyValueDTO from "./DataProvider/Impl/KeyValueDTO.js";
import RecordModelDTO from "../Models/Response/Window/Tab/RecordModelDTO.js";
import PageDataDTO from "../Models/Request/Common/PageDataDTO.js";
import CoreFilterRequestElementInterface from "../Models/Request/Filter/Element/CoreFilterRequestElementInterface.js";
import CoreFilterRequestElementWithOperationParamValueDTO from "../Models/Request/Filter/Element/CoreFilterRequestElementWithOperationParamValueDTO.js";
import CoreFilterRequestElementWithOperandDTO from "../Models/Request/Filter/Element/CoreFilterRequestElementWithOperandDTO.js";
import CoreWindowTabFieldSortOrderProfileDTO from "../Models/Response/Profile/Window/Tab/Field/CoreWindowTabFieldSortOrderProfileDTO.js";

export default class ConvertUtil {

    static Convert(mapRecordChange, originalRecord) {

    }

    static ConvertCoreWindowTabResponseSearchDTOStackToRecordModelDTOArray(coreWindowTabResponseSearchDTOStack) {
        let recordModelDTOArray = [];

        for (let coreWindowTabResponseSearchDTO of coreWindowTabResponseSearchDTOStack) {
            if (coreWindowTabResponseSearchDTO instanceof CoreWindowTabResponseSearchDTO) {
                recordModelDTOArray.push(coreWindowTabResponseSearchDTO.getRecordModelDTO());
            }
        }

        return recordModelDTOArray;
    }

    static ConvertCoreWindowTabFieldSortOrderProfileDTO(key) {
        let keyFind = Object.getOwnPropertyNames(CoreWindowTabFieldSortOrderProfileDTO.Types).find((currentKey) => {
            return CoreWindowTabFieldSortOrderProfileDTO.Types[currentKey].getKey() === key;
        });
        return CoreWindowTabFieldSortOrderProfileDTO.Types[keyFind];
    }

    static CloneForChangeRecord(record) {
        if (record instanceof CoreWindowTabResponseSearchDTO) {
            let recordClone = Util.CloneOfClass(record);
            recordClone.getRecordModelDTO().setFieldValues(null);
            return recordClone;
        }
        return null;
    }

    static ConvertGeneral(ClazzModel, clazzModelJson) {
        if (ClazzModel.prototype instanceof BaseModel) {
            let clazzModelInstance = new ClazzModel();
            clazzModelInstance.applyData(clazzModelJson);
            return clazzModelInstance;
        }
        return null;
    }

    static ConvertGeneralWithArray(ClazzModel, clazzModelArrayJson) {
        let arrayOfInstanceOfModelClass = [];
        if (clazzModelArrayJson instanceof Array) {
            clazzModelArrayJson.forEach((instanceOfModelClass) => {
                arrayOfInstanceOfModelClass.push(ConvertUtil.ConvertGeneral(ClazzModel, instanceOfModelClass));
            });
        }
        return arrayOfInstanceOfModelClass;
    }

    static ConvertGeneralWithArrayWithConsumer(ClazzModel, clazzModelArrayJson, ConsumerFunction) {
        if (clazzModelArrayJson instanceof Array) {
            clazzModelArrayJson.forEach((instanceOfModelClass) => {
                ConsumerFunction(ConvertUtil.ConvertGeneral(ClazzModel, instanceOfModelClass))
            });
        }
    }

    static ConvertGeneralWithMap(ClazzModel, clazzModelMapJson, keyPropsName) {
        let mapOfInstanceOfModelClass = new Map();
        if (clazzModelMapJson instanceof Array) {
            clazzModelMapJson.forEach((instanceOfModelClass) => {
                mapOfInstanceOfModelClass.set(instanceOfModelClass[keyPropsName], ConvertUtil.ConvertGeneral(ClazzModel, instanceOfModelClass));
            });
        } else {
            Object.keys(clazzModelMapJson).forEach(key => {
                let valClazzModel = clazzModelMapJson[key];
                if (valClazzModel instanceof Array) {
                    let arrayOfValue = [];
                    valClazzModel.forEach((instanceOfModelClass) => {
                        arrayOfValue.push(ConvertUtil.ConvertGeneral(ClazzModel, instanceOfModelClass));
                    });
                    mapOfInstanceOfModelClass.set(key, arrayOfValue);
                } else {
                    mapOfInstanceOfModelClass.set(key, ConvertUtil.ConvertGeneral(ClazzModel, valClazzModel));
                }
            });
        }
        return mapOfInstanceOfModelClass;
    }

    static ConvertFieldValuesMap(fieldValues) {
        let mapFieldValues = new Map();
        if (fieldValues)
            Object.keys(fieldValues).forEach(key => {
                key = Number.parseInt(key);
                let val = fieldValues[key];

                let dataProviderInterface = ConvertUtil.ConvertGeneral(DataProviderAbstract, val);

                mapFieldValues.set(key, dataProviderInterface);
            });
        return mapFieldValues;
    }

    static ConvertPkFieldValuesMap(pkFieldValues) {
        let mapPkFieldValues = new Map();
        Object.keys(pkFieldValues).forEach(key => {
            key = Number.parseInt(key);
            let val = pkFieldValues[key];
            mapPkFieldValues.set(key, val);
        });
        return mapPkFieldValues;
    }

    static GeneratePkSerializerId(pkFieldsMap) {
        let pkValue = "";
        pkFieldsMap.forEach((value, key) => {
            if (value) {
                pkValue = pkValue + value + "_";
            }
        });
        return pkValue.substring(0, pkValue.length - 1);
    }

    static KeySerializerKeyValueDTO() {
        let coreTableColumnDataProviderWithSerializerDTO = new CoreTableColumnDataProviderWithSerializerDTO();
        coreTableColumnDataProviderWithSerializerDTO.setCoreTableColumnDataProviderTypeEnum(CoreTableColumnDataProviderTypeEnum.Attrib.Serializer.Table);
        coreTableColumnDataProviderWithSerializerDTO.setCoreTableColumnDataProviderSerializerDTO(SerializerFactory.Serializers.keyValueDTOTypeSerializer);
        return coreTableColumnDataProviderWithSerializerDTO;
    }

    static ConvertCoreWindowTabFieldToKeyValueDTO(coreWindowTabFieldDTO) {
        let keyValueDTO = new KeyValueDTO();
        keyValueDTO.setId(coreWindowTabFieldDTO.getId());
        keyValueDTO.setKey(coreWindowTabFieldDTO);
        keyValueDTO.setDisplay(coreWindowTabFieldDTO.getTranslate());
        keyValueDTO.setTranslate(coreWindowTabFieldDTO.getTranslate());
        keyValueDTO.setOriginalData(coreWindowTabFieldDTO);
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.KeySerializerKeyValueDTO());
        return keyValueDTO;
    }

    static ConvertCoreFilterOperationDTOToKeyValueDTO(coreFilterOperationDTO) {
        let keyValueDTO = new KeyValueDTO();
        keyValueDTO.setId(coreFilterOperationDTO.getId());
        keyValueDTO.setKey(coreFilterOperationDTO);
        keyValueDTO.setDisplay(coreFilterOperationDTO.getTranslate());
        keyValueDTO.setTranslate(coreFilterOperationDTO.getTranslate());
        keyValueDTO.setOriginalData(coreFilterOperationDTO);
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.KeySerializerKeyValueDTO());
        return keyValueDTO;
    }

    static ConvertCoreUserTenantDTOToKeyValueDTO(coreUserTenantDTO) {
        let keyValueDTO = new KeyValueDTO();
        keyValueDTO.setId(coreUserTenantDTO.getId());
        keyValueDTO.setKey(coreUserTenantDTO.getId());
        keyValueDTO.setDisplay(coreUserTenantDTO.getCoreTenantDTO().getName());
        keyValueDTO.setTranslate(coreUserTenantDTO.getCoreTenantDTO().getName());
        keyValueDTO.setOriginalData(coreUserTenantDTO);
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.KeySerializerKeyValueDTO());
        return keyValueDTO;
    }

    static ConvertCoreRoleDTOToKeyValueDTO(coreRoleDTO) {
        let keyValueDTO = new KeyValueDTO();
        keyValueDTO.setId(coreRoleDTO.getId());
        keyValueDTO.setKey(coreRoleDTO.getId());
        keyValueDTO.setDisplay(coreRoleDTO.getTranslate());
        keyValueDTO.setTranslate(coreRoleDTO.getTranslate());
        keyValueDTO.setOriginalData(coreRoleDTO);
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.KeySerializerKeyValueDTO());
        return keyValueDTO;
    }

    static ConvertCoreRoleDTOToKeyValueDTOs(coreRoleDTOs) {
        let keyValuesDTOs = [];
        coreRoleDTOs.forEach((coreRoleDTO) => {
            keyValuesDTOs.push(ConvertUtil.ConvertCoreRoleDTOToKeyValueDTO(coreRoleDTO));
        });
        return keyValuesDTOs;
    }

    static ConvertCoreTranslateLanguageDTOToKeyValueDTO(coreTranslateLanguageDTO) {
        let keyValueDTO = new KeyValueDTO();
        keyValueDTO.setId(coreTranslateLanguageDTO.getId());
        keyValueDTO.setKey(coreTranslateLanguageDTO.getId());
        keyValueDTO.setDisplay(coreTranslateLanguageDTO.getLanguage());
        keyValueDTO.setTranslate(coreTranslateLanguageDTO.getLanguage());
        keyValueDTO.setOriginalData(coreTranslateLanguageDTO);
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.KeySerializerKeyValueDTO());
        return keyValueDTO;
    }

    static ConvertCoreThemeDTOToKeyValueDTO(coreThemeDTO) {
        let keyValueDTO = new KeyValueDTO();
        keyValueDTO.setId(coreThemeDTO.getId());
        keyValueDTO.setKey(coreThemeDTO.getId());
        keyValueDTO.setDisplay(coreThemeDTO.getTranslate());
        keyValueDTO.setTranslate(coreThemeDTO.getTranslate());
        keyValueDTO.setOriginalData(coreThemeDTO);
        keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.KeySerializerKeyValueDTO());
        return keyValueDTO;
    }

    static ConvertKeyValueDTOToPageDataDTO(id, keyValueDTO) {
        let newMapFieldValue = new Map();
        newMapFieldValue.set(id, keyValueDTO);

        let mapPkFieldValue = new Map();
        mapPkFieldValue.set(id, keyValueDTO)

        let record = new RecordModelDTO();
        record.setPkFieldValuesMap(mapPkFieldValue);
        record.setFieldValues(newMapFieldValue);
        record.setDisplay(keyValueDTO.getTranslate());

        let pageDataDTO = new PageDataDTO();
        pageDataDTO.setRecordModelDTO(record);

        return pageDataDTO
    }

    static ConvertArrayKeyValueDTOToArrayOriginalDTO(keyValueDTOArray) {
        let originalDTO = [];
        keyValueDTOArray.forEach((keyValueDTO) => {
            originalDTO.push(keyValueDTO.getOriginalData());
        });
        return originalDTO;
    }

    static ConvertCoreFilterRequestElementValueInterfaceList(coreFilterRequestElementValueInterfaceList) {
        let coreFilterRequestElementValueInterface = [];
        coreFilterRequestElementValueInterfaceList.forEach((coreFilterRequestElementInterface) => {
            let modelCoreFilterRequestElementInterface = ConvertUtil.ConvertGeneral(CoreFilterRequestElementInterface, coreFilterRequestElementInterface);
            let dataModelRegister = modelCoreFilterRequestElementInterface.getDataModelRegistry();
            switch (dataModelRegister) {
                case CoreFilterRequestElementInterface.Register().registerKey_ElementWithOperand :
                    coreFilterRequestElementInterface = ConvertUtil.ConvertGeneral(CoreFilterRequestElementWithOperationParamValueDTO, coreFilterRequestElementInterface);
                    break;
                case CoreFilterRequestElementInterface.Register().registerKey_ElementWithOperationParamValue:
                    coreFilterRequestElementInterface = ConvertUtil.ConvertGeneral(CoreFilterRequestElementWithOperandDTO, coreFilterRequestElementInterface);
                    break;
            }
        });

        return coreFilterRequestElementValueInterface;
    }
}
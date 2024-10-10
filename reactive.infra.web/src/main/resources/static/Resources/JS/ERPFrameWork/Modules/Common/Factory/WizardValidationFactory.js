export default class WizardValidationFactory {
    static Init() {
        WizardValidationFactory.wizardValidationMap = new Map();
    }

    static register(registerKey, wizardValidationFunction) {
        WizardValidationFactory.wizardValidationMap.set(registerKey.toLowerCase(), wizardValidationFunction);
    }

    static factory(registerKey) {
        return WizardValidationFactory.wizardValidationMap.get(registerKey.toLowerCase());
    }
}
export default class TreeGridDescriptor {
    constructor(keyDisplay, keyPk, keyParentPk, IconService) {
        this.keyDisplay = keyDisplay;
        this.keyPk = keyPk;
        this.keyParentPk = keyParentPk;

        this.keyDisplayFunction = this.convertConvertor(keyDisplay);
        this.keyPkFunction = this.convertConvertor(keyPk);
        this.keyParentPkFunction = this.convertConvertor(keyParentPk);
        this.IconService = IconService;
    }

    convertToDisplayRecord(record) {
        return this.keyDisplayFunction(record);
    }

    convertToPKRecord(record) {
        return this.keyPkFunction(record);
    }

    convertToPKParentRecord(record) {
        return this.keyParentPkFunction(record);
    }

    convertConvertor(key) {
        if (key) {
            if (typeof (key) === 'function') {
                return (record) => key(record);
            } else if (key instanceof Array) {
                return (record) => this.convertArrayProps(record, key);
            } else {
                return (record) => record[key];
            }
        }
    }

    convertGeneral(record, key) {
        if (key) {
            if (typeof (key) === 'function') {
                return key(record);
            } else if (key instanceof Array) {
                return this.convertArrayProps(record, key);
            } else {
                return record[key];
            }
        }
        return '';
    }

    convertArrayProps(record, props) {
        if (props && record) {
            let valueSerializeProps = '';
            props.forEach((prop) => {
                let propValue = record[prop];
                valueSerializeProps += propValue != null ? propValue + "_" : "_";
            });
        }
        return null;
    }

    iconServiceDownloader(record, imgTag) {
        this.IconService(record, imgTag);
    }
}
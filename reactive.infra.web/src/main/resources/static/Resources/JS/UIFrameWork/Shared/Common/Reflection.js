export class Reflection {

    constructor() {

    }

    static extendsCLass(sourceInstance, extendClass) {
        Object.getOwnPropertyNames(extendClass.prototype).forEach((prop) => {
            if (prop !== 'constructor') {
                sourceInstance.__proto__[prop] = extendClass.prototype[prop];
            }
            // else {
            //     new extendClass.prototype[prop]();
            // }
        });
    }

    static Register(clazzPath, clazz) {
        if (!this.mapClazz) {
            this.mapClazz = new Map();
        }
        this.mapClazz.set(clazzPath, clazz)
    }

    static Get(clazzPath) {
        if (this.mapClazz) {
            return this.mapClazz.get(clazzPath);
        } else {
            return null;
        }
    }
}
export default class ConvertableFromJson {
    applyData(json) {
        // @ts-ignore
        Object.assign(this, json);
    }
}
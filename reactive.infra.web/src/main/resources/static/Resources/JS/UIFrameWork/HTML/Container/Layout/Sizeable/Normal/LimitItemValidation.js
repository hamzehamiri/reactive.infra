export class LimitItemValidation {
    constructor() {

    }

    setItemValidationType(ItemValidationType) {
        this.ItemValidationType = ItemValidationType;
    }

    getItemValidationType() {
        return this.ItemValidationType;
    }

    setItemCounts(countItem) {
        this.countItem = countItem;
    }

    getItemCounts() {
        return this.countItem;
    }
}

export const ItemValidationType = Object.freeze({
    Limited: Symbol("Limited"),
    NonLimited: Symbol("NonLimited")
});
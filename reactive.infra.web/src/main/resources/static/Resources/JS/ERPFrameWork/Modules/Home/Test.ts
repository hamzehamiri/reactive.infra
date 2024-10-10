export interface Generic {
    name: string;
    id: number;
}

export class Test<T extends Generic> {
    private t: Generic | undefined;

    constructor() {
    }

    public print(t: Generic): void {
        console.log(t.name + " __ " + t.id);
    }
}

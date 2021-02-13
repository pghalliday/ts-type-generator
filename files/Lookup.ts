interface __TTG_LookupKey {
    getKey(): string;
}

class __TTG_Lookup<T extends __TTG_LookupKey> {
    private readonly items: T[];

    constructor(items: T[]) {
        this.items = items;
    }

    lookup(key: string): T {
        for (const item of this.items) {
            if (item.getKey() === key) {
                return item;
            }
        }
        throw new Error(`Item not found: [${key}]`)
    }
}

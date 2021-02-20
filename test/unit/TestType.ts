import {Type} from "../../src/util/Type";
import {Reference} from "../../src/util/Reference";

export class TestType extends Type {
    getDependencies(): Type[] {
        return [];
    }

    getReferences(): Reference[] {
        return [];
    }

    async writeCollapseCode(): Promise<void> {
        // do nothing
    }

    async writeResolveCode(): Promise<void> {
        // do nothing
    }

    async writeValidateCode(): Promise<void> {
        // do nothing
    }
}

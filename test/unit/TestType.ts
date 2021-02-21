import {Type} from "../../src/util/Type";
import {Reference} from "../../src/util/Reference";

export class TestType extends Type {
    getDependencies(): Type[] {
        return [];
    }

    getReferences(): Reference[] {
        return [];
    }

    async writeResolvedCode(): Promise<void> {
        // do nothing
    }

    async writePartialCode(): Promise<void> {
        // do nothing
    }

    async writeValidatedCode(): Promise<void> {
        // do nothing
    }
}

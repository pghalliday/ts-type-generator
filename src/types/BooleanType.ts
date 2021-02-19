import {
    PrimitiveType,
} from '../internal'

export class BooleanType extends PrimitiveType {
    constructor(name: string) {
        super(name, 'boolean');
    }
}

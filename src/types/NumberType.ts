import {
    PrimitiveType,
} from '../internal'

export class NumberType extends PrimitiveType {
    constructor(name: string) {
        super(name, 'number');
    }
}

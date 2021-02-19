import {
    PrimitiveType,
} from '../internal'

export class StringType extends PrimitiveType {
    constructor(name: string) {
        super(name, 'string');
    }
}

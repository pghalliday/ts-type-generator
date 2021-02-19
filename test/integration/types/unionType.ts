import {LiteralType, UnionType} from "../../../lib";

export const unionType = new UnionType('Union')
    .type(new LiteralType<string>('Apple', 'apple'))
    .type(new LiteralType<string>('Banana', 'banana'))
    .type(new LiteralType<string>('Pear', 'pear'))

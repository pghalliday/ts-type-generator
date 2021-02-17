import {StringLiteralType, UnionType} from "../../../lib";

export const unionType = new UnionType('Union')
    .type(new StringLiteralType('apple'))
    .type(new StringLiteralType('banana'))
    .type(new StringLiteralType('pear'))

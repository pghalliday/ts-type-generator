import {ListType, NumberLiteralType, UnionType} from "../../../lib";

export const listType = new ListType(
    new UnionType()
        .type(new NumberLiteralType(100))
        .type(new NumberLiteralType(101))
        .type(new NumberLiteralType(102)),
    'List',
)

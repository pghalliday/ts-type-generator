import {ListType, LiteralType, UnionType} from "../../../lib";

export const listType = new ListType(
    'List',
    new UnionType('ListUnion')
        .type(new LiteralType<number>('List100', 100))
        .type(new LiteralType<number>('List101', 101))
        .type(new LiteralType<number>('List102', 102)),
)

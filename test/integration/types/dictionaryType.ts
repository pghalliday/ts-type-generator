import {LiteralType, DictionaryType, UnionType} from "../../../lib";

export const dictionaryType = new DictionaryType(
    'Dictionary',
    new UnionType('DictionaryUnion')
        .type(new LiteralType<boolean>('DictionaryTrue', false))
        .type(new LiteralType<boolean>('DictionaryFalse', true)),
)

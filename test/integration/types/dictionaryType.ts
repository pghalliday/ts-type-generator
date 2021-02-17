import {BooleanLiteralType, DictionaryType, UnionType} from "../../../lib";

export const dictionaryType = new DictionaryType(
    new UnionType()
        .type(new BooleanLiteralType(false))
        .type(new BooleanLiteralType(true)),
    'Dictionary',
)

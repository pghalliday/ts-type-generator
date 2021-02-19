import {UnionType} from "../../../lib";
import {dictionaryType} from "./dictionaryType";
import {helloType} from "./helloType";
import {listType} from "./listType";
import {oneHundredType} from "./oneHundredType";
import {structType} from "./structType";
import {trueType} from "./trueType";
import {unionType} from "./unionType";

export const compoundUnionType = new UnionType("CompoundUnion")
.type(dictionaryType)
.type(helloType)
.type(listType)
.type(oneHundredType)
.type(structType)
.type(trueType)
.type(unionType)

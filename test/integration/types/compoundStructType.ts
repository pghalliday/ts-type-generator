import {StructType} from "../../../lib";
import {dictionaryType} from "./dictionaryType";
import {helloType} from "./helloType";
import {listType} from "./listType";
import {oneHundredType} from "./oneHundredType";
import {structType} from "./structType";
import {trueType} from "./trueType";
import {unionType} from "./unionType";

export const compoundStructType = new StructType('CompoundStruct')
.property('dictionary', dictionaryType)
.property('hello', helloType)
.property('list', listType)
.property('oneHundred', oneHundredType)
.property('struct', structType)
.property('true', trueType)
.property('union', unionType)

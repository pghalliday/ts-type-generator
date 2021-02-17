import {resolve} from "path";
import {TsTypeGenerator} from "../../../lib";
import {trueType} from "./trueType";
import {oneHundredType} from "./oneHundredType";
import {helloType} from "./helloType";
import {unionType} from "./unionType";
import {listType} from "./listType";
import {dictionaryType} from "./dictionaryType";
import {structType} from "./structType";
import {compoundUnionType} from "./compoundUnionType";
import {compoundStructType} from "./compoundStructType";
import {compoundListType} from "./compoundListType";
import {compoundDictionaryType} from "./compoundDictionaryType";

const tsTypeGenerator = new TsTypeGenerator()

tsTypeGenerator
    .type(trueType)
    .type(oneHundredType)
    .type(helloType)
    .type(unionType)
    .type(listType)
    .type(dictionaryType)
    .type(structType)
    .type(compoundUnionType)
    .type(compoundStructType)
    .type(compoundListType)
    .type(compoundDictionaryType)
    .generate(resolve(__dirname, '../src/types'))
    .then(() => {
        console.log('done')
    })
    .catch((error: Error) => {
        console.error(error)
        process.exit(1)
    })

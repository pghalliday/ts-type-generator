import {ArrayType} from "../types";
import {numberType} from "./numberType";

export const numberArrayType = new ArrayType(numberType, "NumberArrayType")
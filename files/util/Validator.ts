import {ValidationError} from "./ValidationError";

export type Validator<T> = (data: unknown) => T | ValidationError;

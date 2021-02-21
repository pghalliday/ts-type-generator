import {ResolutionError} from "./ResolutionError";
import {ResolvedReferences} from "../references";

export type Resolver<R, V> =  (dest: R, src: V, resolvedReferences: ResolvedReferences) => R | ResolutionError;
